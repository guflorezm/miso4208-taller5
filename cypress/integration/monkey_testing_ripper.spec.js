describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

/*
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;

    if(monkeysLeft > 0) {
      cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.Dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }
}
*/

function randomEvent(monkeysLeft) {

    var monkeysLeft = monkeysLeft;

    if(monkeysLeft > 0) {
      // Obtenemos el evento al azar de los 4 ( Link, Select, Button, Input )
      var luckyEvent = getRandomInt(1,4);

      switch(luckyEvent){
        // Dispara un evento de Link
        case 1:
          cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.Dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                setTimeout(randomEvent, 1000, monkeysLeft);
          });
          break;

        // Dispara un evento de Select
        case 2:
          cy.get('select').then($Selects => {
              var randomSelect = $Selects.get(getRandomInt(0, $Selects.length));
              if(!Cypress.Dom.isHidden(randomSelect)) {
                  var selectOptions = randomSelect.options;
                  // Obtenemos una opcion al azar de las del select seleccionado
                  var randomOption = selectOptions[getRandomInt(0,selectOptions.length)];
                  var optionValue = randomOption.value;
                  cy.wrap(randomSelect).select(optionValue);
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
          });
          break;

        // Dispara un evento de Input
        case 3:
          cy.get('input').then($Inputs => {
              var randomInput = $Inputs.get(getRandomInt(0, $Inputs.length));
              if(!Cypress.Dom.isHidden(randomInput)) {
                  cy.wrap(randomInput).click({force: true}).type("Monkey Test");
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
          });
          break;

        // Dispara un evento de Button
        case 4:
          cy.get('button').then($Buttons => {
              var randomButton = $Buttons.get(getRandomInt(0, $Buttons.length));
              if(!Cypress.Dom.isHidden(randomButton)) {
                  cy.wrap(randomButton).click({force: true});
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
          });
          break;
        }
    }
}
