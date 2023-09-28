/// <reference types="cypress"/>

const body_cadastro = require ('../fixtures/cadastrar_device_sucesso.json')

describe('', () => {

    it('Deletar um dispositivo', () => {
        
        cy.cadastraDevice(body_cadastro)
            .then((response_post) => {
            expect(response_post.status).equal(200)

            cy.request({
                method: 'DELETE',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult')

            cy.get('@deleteDeviceResult').then((response_del) => {
                expect(response_del.status).equal(200)
                expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
            })
        })
    })

    it('Deletar um dispositivo não existente', () => {

            const id_inexistente = 'Qazando'

            cy.request({
                method: 'DELETE',
                url: `/objects/${id_inexistente}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult')

            cy.get('@deleteDeviceResult').then((response_del) => {
                expect(response_del.status).equal(404)
                expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)
            })
        })

    it('Deletar um dispositivo padrão 1', () => {

        cy.request({
            method: 'DELETE',
            url: `/objects/1`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(405)
            expect(response_del.body.error).equal('1 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
        })
    })
})