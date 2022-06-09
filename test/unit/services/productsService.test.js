const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe("Testando a camada de Service", async() => {
  describe("testando a rota /products/:id onde o produto é retornado pelo id", async () => {
    const id = 1;
    const nameProduct = "produto";
    const quantity = 3;
    before(async () => {
      const findId = [[{
        "id": 1,
        "name": "produto",
        "quantity": 10
      }]]

      sinon.stub(productsModel, "getById").resolves(findId)
    });

    after(async () => { productsModel.getById.restore() });

    it("retorna um array", async () => {
      const [response] = await productsService.getProductService(id);

      expect(response).to.be.an("array");
    });
    it("Retorna as chaves 'id, 'name' e 'quantity'", async () => {
      const [response] = await productsService.getProductService(nameProduct, quantity);
      expect(response[0]).to.have.property("id");
      expect(response[0]).to.have.property("name");
      expect(response[0]).to.have.property("quantity");
    })
  });
  describe('quando não há produtos cadastrados', async () => {
    before(async () => {
      const empty = [[]];
      sinon.stub(productsModel, 'getAll').resolves(empty);
    });
    after(async () => {
      productsModel.getAll.restore();
    });
    it('o array retorna como vazio', async () => {
      const response = await productsService.getProductService();
      expect(response[0]).to.be.empty;
    });
    it('retorna um array', async () => {
      const response = await productsService.getProductService();
      expect(response).to.be.an('array');
    });

  });
  describe("Testando a atualização de um produto", async () => {
    const allProducts = [[{
      "id": 1,
      "name": "Martelo",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Traje",
      "quantity": 20
    },
    {
      "id": 3,
      "name": "Escudo",
      "quantity": 30
    }]]
    before(async () => {
      sinon.stub(productsModel, "getById").resolves(allProducts);
      sinon.stub(productsModel, "update").resolves(allProducts);
    });
    after(async () => { productsModel.getById.restore(), productsModel.update.restore() });

    it("atualiza um produto e retorna um objeto", async () => {
      const id = 1;
      const nameProduct = "produto";
      const quantity = 10;
      const response = await productsService.updateProductService(id, nameProduct, quantity);
      expect(response[0][0]).to.be.an("object");
    });
  });

})
