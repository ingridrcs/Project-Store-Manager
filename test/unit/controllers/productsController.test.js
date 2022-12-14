const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const req = require("express/lib/request");

describe("Testando a camada Controller", () => {
  describe("quando o payload informado não é válido", () => {
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
  describe("quando é inserido com sucesso", () => {
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

  describe("quando a busca é feita com sucesso através do id", () => {
    const id = 1;
    const response = {};
    const request = { params: { id } };

    before(() => {
      const productsList = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
      ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(productsList);

      sinon.stub(productsService, "getProductService").resolves(productsList);
    });

    after(() => {
      productsService.getProductService.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.getByIdItens(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    describe("quando a adição de um produto é feita com sucesso", () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = 
          {
            "name": "Martelo de Thor",
            "quantity": 10
          },
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, "addProductService").resolves([{ id:1, name: "Martelo", quantity:2 }]);
      });

      after(() => {
        productsService.addProductService.restore();
      });

    it('é chamado o método "status" passando o código 201', async () => {
      await productsController.addItens(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.addItens(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    });
  });
})
// Source:Aula do módulo 23.4 https://github.com/tryber/sd-xp-b-live-lectures/blob/lecture/23.4/movies-api/tests/controllers/movieController.test.js