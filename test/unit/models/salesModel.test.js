const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db/connection");
const salesModel = require("../../../models/salesModel");

describe("Testar a camada Model", () => {
  describe("Ver se o endpoint GET/sales está retornando correto ", () => {
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

      sinon.stub(connection, "execute").resolves(salelist);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('função retorna um array', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array');
    });
    it('quando o array não está vazio', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.not.empty;
    });
    it('quando o array possui itens do tipo objeto', async () => {
      const [item] = await salesModel.getAll();

      expect(item[0]).to.be.an('object');
    });
    it('possui as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
      const [item] = await salesModel.getAll();

      expect(item[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity')
    });
    // eu posso copiar a resposta que o banco de dados retorna ou tenho que mudar os valores??
  })
  describe("Busca por uma venda pelo id", () => {
    describe("quando a busca ocorre de forma correta", () => {

      const insertId = 1;
      before(async () => {
        const findId = {
          "saleId": 1,
          "date": "2022-06-08T19:27:30.000Z",
          "productId": 1,
          "quantity": 5
        }

        sinon.stub(connection, "execute").resolves(findId);
      });

      after(async () => {
        connection.execute.restore();
      });
      it("retorna um objeto", async () => {
        const response = await salesModel.getById(insertId);

        expect(response).to.be.an("object");
      });
      it('retorna "saleId, "date", "productId" e "quantity"', async () => {
        const response = await salesModel.getById(insertId);
        expect(response).to.have.property("saleId");
        expect(response).to.have.property("date");
        expect(response).to.have.property("quantity");
        expect(response).to.have.property("productId");
      });
    });
  })
  describe("Busca por um filme pelo id", () => {
    describe("quando a busca ocorre de forma correta", () => {

      const insertId = 1;
      before(async () => {
        const findId = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }

        sinon.stub(connection, "execute").resolves(findId);
      });

      after(async () => {
        connection.execute.restore();
      });
      it("retorna um objeto", async () => {
        const response = await salesModel.getById(insertId);

        expect(response).to.be.an("object");
      });

      it('retorna "id, "name, "quantity"', async () => {
        const response = await salesModel.getById(insertId);
        expect(response).to.have.property("id");
        expect(response).to.have.property("name");
        expect(response).to.have.property("quantity");
      });
    });
  })
  describe('Buscando as vendas no banco de dados', () => {
  describe('quando não existe nenhuma venda criada', () => {

    before(async() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async() => {
      connection.execute.restore();
    });

    it('o array está vazio', async () => {
      const [response] = await salesModel.getAll();
      expect(response).to.be.empty;
    });
  });
})
})