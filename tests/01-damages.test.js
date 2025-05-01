import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let damageId;

describe("Damages", () => {
    it("should reject non-string reporter name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/damages")
            .send({ reporterName: 123, damageType: "Fire", damageLevel: 2, location: "Otago", countAffected:5, cause: "Building caught on fire" });

        chai.expect(res.body.message).to.be.equal("reporter name should be a string");
    });

    it("should create a valid damage", async () => {
        const res = await chai.request(app).post("/api/v1/damages").send({
            reporterName: "Building Fire",
            damageType: "Fire",
            damageLevel: 2,
            location: "Otago",
            countAffected:5,
            cause: "Building caught on fire as there was a candle left by the curtain",
        });

        chai
            .expect(res.body.message)
            .to.be.equal("Damage successfully recorded");
            damageId = res.body.data[0].id;
    });

    it("should retrieve all damages", async () => {
        const res = await chai.request(app).get("/api/v1/damages");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve an damage by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/damages/${damageId}`);

        chai.expect(res.body.data.reporterName).to.be.equal("Building Fire");
    });

    it("should filter damages by damageType", async () => {
        const res = await chai.request(app).get("/api/v1/damages?damageType=Fire");

        chai.expect(res.body.data[0].damageType).to.be.equal("Fire");
    });

    it("should reject non-string location during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/damages/${damageId}`)
            .send({
                reporterName: "Building Fire",
                damageType: "Fire",
                damageLevel: 2,
                location: 123,
                countAffected:5,
                cause: "Building caught on fire as there was a candle left by the curtain",
            });

        chai.expect(res.body.message).to.be.equal("location should be a string");
    });

    it("should update a valid damage", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/damages/${damageId}`)
            .send({
                reporterName: "Building Fire",
                damageType: "Fire",
                damageLevel: 2,
                location: "Otago",
                countAffected:5,
                cause: "Building caught on fire as there was a hot iron left on the bed",
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Damage record with the id: ${damageId} successfully updated`
            );
    });

    it("should delete an damage by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/damages/${damageId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Damage record with the id: ${damageId} successfully deleted`
            );
    });
});