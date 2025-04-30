const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About Page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        // Membuat Route dengan path parameter & query parameter
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const { name = 'stranger' } = request.params;
            const { lang } = request.query;

            if (lang === 'id') {
                return `Halo ${name}`;
            }

            return `Hello ${name}`;
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    }
];

module.exports = routes;