const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe("Testando a camada de Service", () => {
  describe("testando a rota /products/:id onde o produto é retornado pelo id", async () => {
    const id = null;
    const nameProduct = "produto";
    const quantity = 3;
    before(async () => {
      const findId = [{
        "id": 1,
        "name": "produto",
        "quantity": 10
      }]

      sinon.stub(productsModel, "getById").resolves(findId)
    });

    after(async () => { productsModel.getById.restore() });

    it("retorna um objeto", async () => {
      const [response] = await productsService.getProductService(id);

      expect(response).to.be.an("object");
    });
    it("Retorna as chaves 'id, 'name' e 'quantity'", async () => {
      const [response] = await productsService.getProductService(nameProduct, quantity);
      expect(response).to.have.property("id");
      expect(response).to.have.property("name");
      expect(response).to.have.property("quantity");
    })
  });
  describe("Testando a rota /products para adição de um produto", () => {
    describe("retorno de um ", () => {
      before(async () => {
        const findId = [{
          "id": 1,
          "name": "produto",
          "quantity": 10
        }]
        sinon.stub(productsModel, "getByName").resolves(findId)
      });
      after(async () => { productsModel.getByName.restore() });
    })
    it("retorna um objeto", async () => {
      const nameProduct = "produtoA";
      const quantity = 3;
      const response = await productsService.addProductService(nameProduct, quantity);

      expect(response).to.be.an("object");
    });

    // it('se "name" retorna uma string', async () => {
    //   const response = await productsModel.getByName(insertName);
    //   expect(response.name).to.be.a("string");
    // });
  })
})