const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("Testando a camada de Service", () => {
  describe("testando a rota /sales/:id onde a venda é retornada pelo id", () => {
    const id = 1;
    before(async () => {
      const findId = [[{
        "saleId": 1,
        "date": "2022-06-08T19:27:30.000Z",
        "productId": 1,
        "quantity": 5
      }]]

      sinon.stub(salesModel, "getById").resolves(findId)
    });

    after(async () => { salesModel.getById.restore() });

    it("retorna um array", async () => {
      const response = await salesService.getSaleService(id);

      expect(response).to.be.an("array");
    });
    it("Retorna as chaves 'saleId, 'date' 'productId' e 'quantity'", async () => {
      const [response] = await salesService.getSaleService(id);
      expect(response[0]).to.have.property("saleId");
      expect(response[0]).to.have.property("date");
      expect(response[0]).to.have.property("quantity");
      expect(response[0]).to.have.property("productId");
    })
  });
  describe('quando não há vendas cadastradas', () => {
    before(async() => {
      const empty = [[]];
      sinon.stub(salesModel, 'getAll').resolves(empty);
    });
    after(async() => {
      salesModel.getAll.restore();
    });
    it('o array retorna como vazio', async () => {
      const response = await salesService.getSaleService();
      expect(response[0]).to.be.empty;
    });
    it('retorna um array', async () => {
      const response = await salesService.getSaleService();
      expect(response).to.be.an('array');
    });

  });
  describe("Testando a atualização de uma venda", () => {
    const salelist = [[
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
    before(async () => {
      sinon.stub(salesModel, "getById").resolves(salelist);
      sinon.stub(salesModel, "update").resolves(salelist);
    });
    after(async () => { salesModel.getById.restore(), salesModel.update.restore() });

    it("atualiza uma venda e retorna um objeto", async () => {
      const id = 1;
      const productId = 2;
      const quantity = 10;
      const response = await salesService.updateSalesService(id, productId, quantity);
      expect(response[0][0]).to.be.an("object");
    });
  });

})