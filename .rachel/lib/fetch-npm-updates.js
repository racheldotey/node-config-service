const { searchPackages } = require('query-registry');

const console = require('./console-extras');
const fsUtils = require('./utils-fs');
const dateUtils = require('./utils-date');




const FIND = 'eslint'
const FILE_NAME = 'npm_packages';



const isRelated = ({ name }) => (name.includes(FIND));

const parsePackage = ({ package }) => {
    const { name, version, description, links } = package;
    return {
        isRelated: (isRelated(package)),
        name: name,
        version: version,
        description: description,
        links: links
    };
};

const parseJsonFile = (paging, packages) => {
    return {
        timestamp: dateUtils.now(),
        isComplete: (paging.total === packages.length),
        count: packages.length,
        paging,
        packages
    };
};

const parseApiResponse = async (paging, response) => {
    const { size, page, pages, total } = paging;
    const { objects } = response;

    const currentPage = page + 1;

    console.debug(`Saving request #${currentPage} of ${pages}.`, `${size} packages each, for a total of ${total} npm packages.`);

    // Remove unused package data
    const packages = objects.map(parsePackage);

    const data = parseJsonFile(paging, packages);
    await fsUtils.saveJson(`${FILE_NAME}_${page}.json`, data);

    console.debug(`#${currentPage}/${pages} saved. ${pages - currentPage} to go.`);

    return data;
};

const fetchNpmRegistryData = async (opts = {}, allPackages = { packages: [] }) => {
    try {
        const paging = {
            throttle: opts.throttle || 200, // ms delay between requests
            limit: opts.limit || 1000,      // Max number of requests, prevents trying to pull all of NPM
            size: opts.size || 100,         // Request (page) size
            page: opts.page || 0,           // Current page being requested
            pages: opts.pages || 0,         // Total number of pages available
            total: opts.total || 0          // Total number of records available
        };

        const response = await searchPackages({ query: { text: FIND, size: paging.size, from: paging.page } });
        if(paging.total !== response.total) {
            paging.total = response.total;
            paging.pages = Math.ceil(paging.total / paging.size);
        }

        const data = await parseApiResponse(paging, response);
        data.packages = [...allPackages.packages, ...data.packages]
        allPackages = data;

        if (paging.page < paging.pages && (paging.page + 1 < Math.ceil(paging.limit / paging.size))) {
            paging.page++;
            // Slow down requests so as not to DOS the API
            await new Promise((resolve) => setTimeout(resolve, paging.throttle));

            return await fetchNpmRegistryData(paging, allPackages);
        }

        return allPackages;
    } catch (err) {
        console.error(err);
    }
}

const combinePagedData = async (preCombined) => {
    let combined;
    const fileName = `${FILE_NAME}_combined.json`;

    if (preCombined) {
        const data = await parseJsonFile(preCombined.paging, preCombined.packages);
        preCombined.paging.page = null;
        await fsUtils.saveJson(fileName, data);
    }

    if(await fsUtils.existsInWorkspace(fileName)) {
        combined = await fsUtils.readJson(fileName);
    }

    return combined;
}

const filterRelated = async (combined) => {
    let filtered;
    const fileName = `${FILE_NAME}_filtered.json`;

    if (combined) {
        combined.packages = combined.packages.filter(p => p.isRelated);

        await fsUtils.saveJson(fileName, combined);

        return combined;
    }

    if(await fsUtils.existsInWorkspace(fileName)) {
        filtered = await fsUtils.readJson(fileName);
    }

    return filtered;
}

const update = async ({ throttle, limit, size }) => {
    console.info(`Starting eslint package update process.`);

    let data = await fetchNpmRegistryData({ throttle, limit, size });
    data = await combinePagedData(data);
    data = await filterRelated(data);
    return data;
}



exports.update = update;