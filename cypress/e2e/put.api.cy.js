/// <reference types="cypress"/>

describe('', () => {

    const body_cadastro = require('../fixtures/cadastrar_device_sucesso.json')
    const body_update = require('../fixtures/update_device_sucesso.json')

    it('Alterar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

        cy.cadastraDevice(body_cadastro)
            .then((response_post) => {
                expect(response_post.status).equal(200)
                expect(response_post.body.name).equal(body_cadastro.name)

                cy.request({
                    method: 'PUT',
                    url: `/objects/${response_post.body.id}`,
                    failOnStatusCode: false,
                    body: body_update
                }).as('putDeviceResult')

                cy.get('@putDeviceResult').then((response_put) => {
                    expect(response_put.status).equal(200)
                    expect(response_put.body.updatedAt).not.empty
                    expect(response_put.body.updatedAt.slice(0, 16)).equal(dataAtual)
                    expect(response_put.body.name).equal(body_update.name)
                    expect(response_put.body.data.year).equal(body_update.data.year)
                    expect(response_put.body.data['CPU model']).equal(body_update.data["CPU model"])
                    expect(response_put.body.data['Hard disk size']).equal(body_update.data["Hard disk size"])
                    expect(response_put.body.data.Color).equal(body_update.data.Color)

                })
            })
    })
})