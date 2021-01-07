module.exports = {
    currentUser: null,
    parse2Plain: (object) => {
        if(!object) return null;

        return JSON.parse(JSON.stringify(object));
    }
}