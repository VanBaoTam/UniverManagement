function rowToObject(row, header) {
    const obj = {};
    header.forEach((key, index) => {
        obj[key] = row[index];
    });
    return obj;
}

export { rowToObject };
