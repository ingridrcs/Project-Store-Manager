const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe("Testando a camada Controller", () => {
  describe("quando o payload informado não é válido", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns("Sale not found");

      sinon.stub(salesService, "getSaleService").resolves([{}]);
    });

    after(() => { salesService.getSaleService.restore() });

    it("é chamado o status com o código 404", async () => {
      await salesController.getAllItens(request, response);

      expect(response.status.calledWith(404)).to.be.equal(false);
    });

    it('é chamado o json com a mensagem "Sale not found"', async () => {
      await salesController.getAllItens(request, response);

      expect(response.json.calledWith("Sale not found")).to.be.equal(false);
    });
  });
  describe("quando é inserido com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      const salesList = [[
        {
          "saleId": 1,
          "date": "2022-06-08T19:27:30.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2022-06-08T19:27:30.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2022-06-08T19:27:30.000Z",
          "productId": 3,
          "quantity": 15
        }
      ]];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(salesList);

      sinon.stub(salesService, "getSaleService").resolves(salesList);
    });

    after(() => {
      salesService.getSaleService.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await salesController.getAllItens(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe("quando a busca é feita com sucesso através do id", () => {
    const id = 1;
    const response = {};
    const request = { params: { id } };

    before(() => {
      const salesList = [
      {
        "saleId": 1,
        "date": "2022-06-08T19:27:30.000Z",
        "productId": 1,
        "quantity": 5
      }
      ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(salesList);

      sinon.stub(salesService, "getSaleService").resolves(salesList);
    });

    after(() => {
      salesService.getSaleService.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await salesController.getByIdItens(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    describe("quando a adição de uma venda é feita com sucesso", () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = 
          {
            "id": "Martelo de Thor",
            "productId":2,
            "quantity": 10
          },
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, "addSalesService").resolves([{ id:1, procuctId: 2, quantity:2 }]);
      });

      after(() => {
        salesService.addSalesService.restore();
      });

    it('é chamado o método "status" passando o código 201', async () => {
      await salesController.addItens(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesController.addItens(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    });
  });
})