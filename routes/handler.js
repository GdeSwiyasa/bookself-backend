const { nanoid } = require('nanoid');
const books = require('./books');


const getAll = (required, response) => {
    return response.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    }).code(200);
}

const getDataIdbyHandler = (required, response) => {
    const { id } = required.params;
    const book = books.filter((data) => data.id === id)[0];

    if (book !== undefined) {
        return response.response({
            status: 'success',
            data: {
                book,
            },
        }).code(200);
    }

    return response.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
}

const addDatabyHandler = (required, response) => {
    let {
        name,
        pageCount,
        readPage,
    } = required.payload;
    const payload = required.payload;
    const id = nanoid(16);

    if (!name) {
        return response.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        }).code(400);
    }
    if (readPage > pageCount) {
        return response.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    payload['finished'] = readPage === pageCount;

    const data_books = {
        id,
        ...payload,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    books.push(data_books);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        return response.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            },
        }).code(201);
    }

    return response.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    }).code(500);
}

const putDataByHandler = (required, response) => {
    const {
        readPage,
        pageCount,
        name
    } = required.payload;
    const { id } = required.params;

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        if (!name) {
            return response.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            }).code(400);
        }

        if (readPage > pageCount) {
            return response.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        }

        books[index] = {
            ...books[index],
            ...required.payload,
            updatedAt
        };

        return response.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    }

    return response.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
}

const deleteDataByHandler = (required, response) => {
    const { id } = required.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        return response.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }

    return response.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
}

module.exports = {
    getAll,
    getDataIdbyHandler,
    addDatabyHandler,
    putDataByHandler,
    deleteDataByHandler
}