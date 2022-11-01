/// <reference types="cypress" />

describe('end to end test', () => {

    it('tests full user scenario end to end', () => {
        cy.visit('http://it2810-14.idi.ntnu.no/project3/')                                //go to website
        cy.get('[data-testid=searchbar]').click().type('coldplay')       //click searchbar and type in colplay 
        cy.wait(1000)                                                    //wait for page to render
        cy.get('.MuiPaginationItem-page').last().click({ force: true })   //Click next page
        cy.wait(1000)                                                    //wait for render
        cy.get('a').first().click()                                      //click the first result
        cy.get('[data-testid=username]').click().type('testuser')        //Click and type testuser
        cy.get(".MuiRating-visuallyHidden").first().click({ force: true })//Click one star
        cy.get('[data-testid=description]').click().type('bad song')     //Click on description andf type "bad song"
        cy.get('[data-testid="submit"]').click()                         //Click on submit review
        cy.get('[data-testid=backtosearch]').click()                     //Click back to songsearch  
        cy.get('[data-testid=clearbutton]').click()                      //Click clear
        cy.get('[data-testid=selectYear]').parent().click()              //Click select and choose 1999
            .get('ul > li[data-value="1999"]').click();
        cy.get('[data-testid=selectOrder]').parent().click()             //Click order er choose oldest first
            .get('ul > li[data-value="0"]').click();
    })

})