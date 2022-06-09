const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db/connection");
const productsModel = require("../../../models/productsModel");

describe("Testar a camada Model", async() => {
  describe("Ver se o endpoint GET/products está retornando todos os produtos do BD ", async() => {
    const list = [[
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
    ]];
    before(async () => {

      sinon.stub(connection, "execute").resolves(list);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('função retorna um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
    });
    it('quando o array não está vazio', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.not.empty;
    });
    it('quando o array possui itens do tipo objeto', async () => {
      const [item] = await productsModel.getAll();

      expect(item[0]).to.be.an('object');
    });
    it('possui as propriedades: "id", "name" e "quantity"', async () => {
      const [item] = await productsModel.getAll();

      expect(item[0]).to.include.all.keys('id', 'name', 'quantity')
    });
    // eu posso copiar a resposta que o banco de dados retorna ou tenho que mudar os valores??
  })

  describe("Busca por um produto pelo id", async() => {
    describe("quando a busca ocorre de forma correta", async () => {

      const insertId = 1;
      before(async () => {
        const findId = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }

        sinon.stub(connection, "execute").resolves(findId)});

      after(async () => {connection.execute.restore()});

      it("retorna um objeto", async () => {
        const response = await productsModel.getById(insertId);

        expect(response).to.be.an("object");
      });

      it('retorna "id, "name, "quantity"', async () => {
        const response = await productsModel.getById(insertId);
        expect(response).to.have.property("id");
        expect(response).to.have.property("name");
        expect(response).to.have.property("quantity");
      });
    });
  })

  describe('Buscando os produtos no banco de dados', async() => {
    describe('quando não existe nenhum produto criado', async () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('o array está vazio', async () => {
      const [response] = await productsModel.getAll();
      expect(response).to.be.empty;
    });
  });
})
  describe("Busca por um produto pelo nome", async() => {
    describe("quando a busca ocorre de forma correta", async () => {
      const insertName = "produto";
      before(async () => {
        const findName = [{
          "id": 1,
          "name": "produto",
          "quantity": 10
        }]

        sinon.stub(connection, "execute").resolves(findName)});

      after(async () => {connection.execute.restore()});

      it("retorna um objeto", async () => {
        const response = await productsModel.getByName(insertName);

        expect(response).to.be.an("object");
      });

      it('se "name" retorna uma string', async () => {
        const response = await productsModel.getByName(insertName);
        expect(response.name).to.be.a("string");
      });
    });
  })
})

// Source: Aula do bloco 23.4 https://github.com/tryber/sd-xp-b-live-lectures/blob/lecture/23.4/movies-api/tests/services/movieService.test.js