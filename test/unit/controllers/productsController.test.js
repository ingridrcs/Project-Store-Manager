const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe("Testando a camada Controller", () => {
  describe("quando o payload informado não é válido", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns("Product not found");

      sinon.stub(productsService, "getProductService").resolves([{}]);
    });

    after(() => { productsService.getProductService.restore() });

    it("é chamado o status com o código 404", async () => {
      await productsController.getAllItens(request, response);

      expect(response.status.calledWith(404)).to.be.equal(false);
    });

    it('é chamado o json com a mensagem "Product not found"', async () => {
      await productsController.getAllItens(request, response);

      expect(response.json.calledWith("Product not found")).to.be.equal(false);
    });
  });
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      const productsList = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
        }
      ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(productsList);

      sinon.stub(productsService, "getProductService").resolves(productsList);
    });

    after(() => {
      productsService.getProductService.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.getAllItens(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

  });
})