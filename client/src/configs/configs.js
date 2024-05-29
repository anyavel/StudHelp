const baseURL = 'http://localhost:5001';

const auth = '/auth';
const signIn = auth + '/signin';
const me = auth + '/me';
const refresh = auth + '/refresh';
const signUp = auth + '/signup';
const personalData = auth + '/personal-data';

const announcements = '/announcements';
const add = announcements;
const deleteAnnouncement = announcements;

const urls = {
    auth: {
        signIn, 
        me,
        refresh,
        signUp,
        personalData
    },
    announcements: {
        announcements,
        add,
        delete: deleteAnnouncement
    }
}

const getStaticUrl = (fileName) => 'http://localhost:5001/files/' + fileName;

export {
    urls,
    baseURL, 
    getStaticUrl
}