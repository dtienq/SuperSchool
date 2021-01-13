module.exports = {
    currentUser: {},
    parse2Plain: (object) => {
        if(!object) return null;

        return JSON.parse(JSON.stringify(object));
    }
}