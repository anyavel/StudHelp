const baseURL = 'http://localhost:5001';

const auth = '/auth';
const signIn = auth + '/signin';
const me = auth + '/me';
const refresh = auth + '/refresh';
const signUp = auth + '/signup';
const forgotPass = auth + '/forgot-pass';
const resetPass = auth + '/restore-pass';
const personalData = auth + '/personal-data';

const announcements = '/announcements';
const add = announcements;
const deleteAnnouncement = announcements;

const admin = '/admin';
const users = admin + '/user';

const rooms = '/room';

const urls = {
    auth: {
        signIn, 
        me,
        refresh,
        signUp,
        personalData,
        forgotPass,
        resetPass
    },
    announcements: {
        announcements,
        add,
        delete: deleteAnnouncement
    },

    admin: {
        users
    },
    rooms: {
        rooms
    }
}

const getStaticUrl = (fileName) => 'http://localhost:5001/files/' + fileName;

export {
    urls,
    baseURL, 
    getStaticUrl
}