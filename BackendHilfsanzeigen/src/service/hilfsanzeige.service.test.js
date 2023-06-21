const { ObjectId } = require("mongodb");
import HilfsanzeigeService from "./hilfsanzeige.service";
import { database } from "../database";

jest.mock("../database", () => ({
  database: {
    collection: jest.fn(),
  },
}));

describe("HilfsanzeigeService", () => {
  let service;
  let mockCollection;
  let mockInsertedId;

  beforeEach(() => {
    // Mocking der MongoDB-Sammlung
    mockCollection = {
      find: jest.fn(),
      findOne: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    };

    database.collection.mockReturnValue(mockCollection);

    service = new HilfsanzeigeService();

    // Mocking der generierten ObjectId
    mockInsertedId = new ObjectId();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("search", () => {
    test("should return the list of found Hilfsanzeigen", async () => {
      // Mocking der MongoDB find-Methode
      const mockCursor = {
        toArray: jest.fn().mockReturnValue(["Hilfsanzeige 1", "Hilfsanzeige 2"]),
      };
      mockCollection.find.mockReturnValue(mockCursor);

      const query = { kategorie: "Test" };
      const result = await service.search(query);

      expect(mockCollection.find).toHaveBeenCalledWith(query, {
        sort: {
          titel: 1,
        },
      });
      expect(mockCursor.toArray).toHaveBeenCalled();
      expect(result).toEqual(["Hilfsanzeige 1", "Hilfsanzeige 2"]);
    });
  });

  describe("create", () => {
    test("should create a new Hilfsanzeige and return the inserted data", async () => {
      // Mocking der MongoDB insertOne- und findOne-Methode
      const mockInsertedHilfsanzeige = {
        _id: mockInsertedId,
        titel: "Test Titel",
        beschreibung: "Test Beschreibung",
        kategorie: "Test Kategorie",
        zeitraum: "Test Zeitraum",
        standort: "Test Standort",
        nutzername: "Test Nutzername",
      };
      mockCollection.insertOne.mockReturnValue({
        insertedId: mockInsertedId,
      });
      mockCollection.findOne.mockReturnValue(mockInsertedHilfsanzeige);

      const result = await service.create({
        titel: "Test Titel",
        beschreibung: "Test Beschreibung",
        kategorie: "Test Kategorie",
        zeitraum: "Test Zeitraum",
        standort: "Test Standort",
        nutzername: "Test Nutzername",
      });

      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        titel: "Test Titel",
        beschreibung: "Test Beschreibung",
        kategorie: "Test Kategorie",
        zeitraum: "Test Zeitraum",
        standort: "Test Standort",
        nutzername: "Test Nutzername",
      });
      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: mockInsertedId,
      });
      expect(result).toEqual(mockInsertedHilfsanzeige);
    });
  });

  describe("read", () => {
    test("should return the found Hilfsanzeigedaten by ID", async () => {
        // Mocking der MongoDB findOne-Methode
        const mockHilfsanzeige = {
          _id: mockInsertedId,
          titel: "Test Titel",
          beschreibung: "Test Beschreibung",
          kategorie: "Test Kategorie",
          zeitraum: "Test Zeitraum",
          standort: "Test Standort",
          nutzername: "Test Nutzername",
        };
        mockCollection.findOne.mockReturnValue(mockHilfsanzeige);
      
        const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
        const result = await service.read(id);
      
        expect(mockCollection.findOne).toHaveBeenCalledWith({
          _id: new ObjectId(id),
        });
        expect(result).toEqual(mockHilfsanzeige);
      });
  });

  describe("update", () => {
    test("should update the Hilfsanzeige and return the updated data", async () => {
        const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
        const hilfsanzeige = {
          _id: id,
          titel: "Neuer Titel",
          beschreibung: "Neue Beschreibung",
          kategorie: "Neue Kategorie",
          zeitraum: "Neuer Zeitraum",
          standort: "Neuer Standort",
          nutzername: "Neuer Nutzername",
        };
        
        // Mocking der MongoDB findOne-Methode
        mockCollection.findOne.mockReturnValue(hilfsanzeige);
    
        const result = await service.update(id, hilfsanzeige);
    
        expect(mockCollection.findOne).toHaveBeenCalledWith({
          _id: new ObjectId(id),
        });
        expect(mockCollection.updateOne).toHaveBeenCalledWith(
          { _id: new ObjectId(id) },
          {
            $set: {
              titel: "Neuer Titel",
              beschreibung: "Neue Beschreibung",
              kategorie: "Neue Kategorie",
              zeitraum: "Neuer Zeitraum",
              standort: "Neuer Standort",
              nutzername: "Neuer Nutzername",
            },
          }
        );
        expect(result).toEqual(hilfsanzeige);
      });

    test("should return undefined if the Hilfsanzeige does not exist", async () => {

      const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
      const hilfsanzeige = {
        titel: "Neuer Titel",
        beschreibung: "Neue Beschreibung",
        kategorie: "Neue Kategorie",
        zeitraum: "Neuer Zeitraum",
        standort: "Neuer Standort",
        nutzername: "Neuer Nutzername",
      };
      const result = await service.update(id, hilfsanzeige);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(id),
      });
      expect(mockCollection.updateOne).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe("delete", () => {
    test("should delete the Hilfsanzeige and return the number of deleted documents", async () => {
      // Mocking der MongoDB deleteOne-Methode
      const mockDeleteResult = {
        deletedCount: 1,
      };
      mockCollection.deleteOne.mockReturnValue(mockDeleteResult);
  
      const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
      const result = await service.delete(id);
  
      expect(mockCollection.deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(id),
      });
      expect(result).toEqual(mockDeleteResult.deletedCount);
    });
  
    test("should return 0 if the Hilfsanzeige does not exist", async () => {
      // Mocking der MongoDB deleteOne-Methode
      const mockDeleteResult = {
        deletedCount: 0,
      };
      mockCollection.deleteOne.mockReturnValue(mockDeleteResult);
  
      const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
      const result = await service.delete(id);
  
      expect(mockCollection.deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(id),
      });
      expect(result).toEqual(mockDeleteResult.deletedCount);
    });
  });  
});
