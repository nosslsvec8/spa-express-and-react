/**
 * @return {boolean}
 */
function IsUrlDateNotLaterCurrent(path) {
    const currentDate = new Date();
    const relativePathSplit = path;
    const fullDateRegex = /(\d{4})-(0[0-9]|[1][0-2])-([0-2][0-9]|3[0-1])/;
    let urlDate = 0;

    if(fullDateRegex.test(relativePathSplit)) {
        urlDate = relativePathSplit.match(fullDateRegex);
        urlDate =  new Date(urlDate[0]);
    }

    return (currentDate >= urlDate);
}

export default IsUrlDateNotLaterCurrent;
