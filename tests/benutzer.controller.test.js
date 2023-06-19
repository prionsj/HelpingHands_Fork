

import { createRequest, createResponse } from "node-mocks-http";
import BenutzerController from "../BackendBenutzer/src/controller/benutzer.controller.js";
import BenutzerService from "../BackendBenutzer/src/service/benutzer.service.js";

describe("BenutzerController", () => {
  let benutzerController;
  let req;
  let res;
  let next;

  beforeEach(() => {
    benutzerController = new BenutzerController();
    req = createRequest();
    res = createResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("search", () => {
    test("should call BenutzerService search method and send response", async () => {
      req.query = { searchTerm: "test" };
      const searchResult = [{ id: 1, name: "Test Benutzer" }];
      jest.spyOn(BenutzerService.prototype, "search").mockResolvedValue(searchResult);

      await benutzerController.search(req, res, next);

      expect(BenutzerService.prototype.search).toHaveBeenCalledWith(req.query);
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual(searchResult);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    test("should call BenutzerService create method and send response", async () => {
      req.body = { name: "Test Benutzer" };
      const createdBenutzer = { id: 1, name: "Test Benutzer" };
      jest.spyOn(BenutzerService.prototype, "create").mockResolvedValue(createdBenutzer);

      await benutzerController.create(req, res, next);

      expect(BenutzerService.prototype.create).toHaveBeenCalledWith(req.body);
      expect(res.statusCode).toBe(201);
      expect(res.getHeader("Location")).toBe("/benutzer/1");
      expect(res._getData()).toEqual(createdBenutzer);
      expect(next).toHaveBeenCalled();
    });
  });

  // Weitere Tests für die anderen Methoden des Controllers

});
