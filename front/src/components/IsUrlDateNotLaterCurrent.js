function IsUrlDateNotLaterCurrent() {
    const currentDate = new Date();
    const relativePathSplitArr = window.location.href;
    const fullDateRegex = /(\d{4})-(0[0-9]|[1][0-2])-([0-2][0-9]|3[0-1])/;
    let urlDate = 0;

    if(fullDateRegex.test(relativePathSplitArr)) {
        urlDate = relativePathSplitArr.match(fullDateRegex);
        urlDate =  new Date(urlDate[0]);
    }

    return (currentDate >= urlDate);
}

export default IsUrlDateNotLaterCurrent;
