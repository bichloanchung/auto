/// <reference types = "cypress" />

describe('Test suite', () => {
    Cypress.Commands.add('authenticate', () =>{
        const USER_CREDENTIALS = {
            'username': 'tester01',
		    'password': 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'
        }
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type':'application/json'
            },
            body: USER_CREDENTIALS
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({loginToken:response.body})
            cy.log(response.body)
        }))
    })

    it('Login', () => {
        cy.authenticate()
    })

    /*it('Login', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type':'application/json'
            },
            body:{
                'username': 'tester01',
		        'password': 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({loginToken:response.body})
            cy.log(response.body)
        }))
    })*/
    it('Create bill', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/bill/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type':'application/json'
                },
            body:{
                "value":"5000"
                }
        }).then((response => {
            expect(response.status).to.eq(200)
        }))
    })
    it('Edit Last Bill', () => {
        //cy.authenticate().then((response => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/bills',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
                
                cy.request({
                    method: 'GET',
                    url: 'http://localhost:3000/api/bills/' + lastID,
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                        'Content-Type':'application/json'
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))
        //}))
    })
})


    