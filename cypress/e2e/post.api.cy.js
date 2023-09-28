/// <reference types="cypress"/>

describe('', () => {

    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

        cy.cadastraDevice(payload_cadastro_device)
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.id).not.empty
                expect(response.body.createdAt).not.empty
                expect(response.body.createdAt.slice(0, 16)).equal(dataAtual)
                expect(response.body.name).not.empty
                expect(response.body.name).equal('Celular da Qazando')
                expect(response.body.data).not.empty
                expect(response.body.data.year).not.string
                expect(response.body.data.year).equal(2023)
                expect(response.body.data.price).not.string
                expect(response.body.data.price).equal(1099.99)
                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data['CPU model']).equal('Snapdragon 999')
                expect(response.body.data['Hard disk size']).not.empty
                expect(response.body.data['Hard disk size']).equal('1 TB')
                expect(response.body.data.Color).not.empty
                expect(response.body.data.Color).equal('Azul banana')
            })
    })

    it('Cadastrar um dispositivo sem mandar dados', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

        cy.cadastraDevice()
            .then((response) => {
                expect(response.status).equal(400)
                expect(response.body.error)
                    .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')

            })
    })

})