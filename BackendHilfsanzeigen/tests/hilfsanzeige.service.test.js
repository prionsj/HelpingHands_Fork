const { ObjectId } = require("mongodb");
import HilfsanzeigeService from "../src/service/hilfsanzeige.service";
import { database } from "../src/database";


/**
 * Unit Test für hilfsanzeige.service.test.js um verschiedene Funktionalitäten
 * zu testen.
 */

// Mock erstellen
jest.mock("../src/database", () => ({
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



/**
  * Unit Test für hilfsanzeige.service.test.js um die serach-Funktionalität
  * zu testen.
  */

  describe("search", () => {


    // Testet, ob eine Liste an gefunden Hilfsanzeigen zurückgegeben wird
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


    // Testet, ob ein leeres Array zurückgegeben wird, wenn die Suchkriterien 
    // zu keiner Hilfsanzeige passen.
    test("should return an empty array if no Hilfsanzeigen match the search criteria", async () => {
      // Mocking der MongoDB find-Methode
      const mockCursor = {
        toArray: jest.fn().mockReturnValue([]),
      };
      mockCollection.find.mockReturnValue(mockCursor);

      const query = { kategorie: "Nonexistent" };
      const result = await service.search(query);

      expect(mockCollection.find).toHaveBeenCalledWith(query, {
        sort: {
          titel: 1,
        },
      });
      expect(mockCursor.toArray).toHaveBeenCalled();
      expect(result).toEqual([]);
    });


    // Testet, ob die Hilfsanzeigen in der erwarteten Reihenfolge ausgegeben werden.
    test("should return Hilfsanzeigen in the expected order", async () => {
      // Mocking der MongoDB find-Methode
      const mockCursor = {
        toArray: jest.fn().mockReturnValue([
          { titel: "Hilfsanzeige 1" },
          { titel: "Hilfsanzeige 2" },
        ]),
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
      expect(result).toEqual([
        { titel: "Hilfsanzeige 1" },
        { titel: "Hilfsanzeige 2" },
      ]);
    });


    // Testet, ob ein leeres Array zurückgegeben wird, wenn die Suchanfrage
    // leer ist.
    test("should return empty array if search query is empty", async () => {
      // Mocking der MongoDB find-Methode
      const mockCursor = {
        toArray: jest.fn().mockReturnValue([]),
      };
      mockCollection.find.mockReturnValue(mockCursor);

      const query = {};
      const result = await service.search(query);

      expect(mockCollection.find).toHaveBeenCalledWith(query, {
        sort: {
          titel: 1,
        },
      });
      expect(mockCursor.toArray).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });



/**
  * Unit Test für hilfsanzeige.service.test.js um die create-Funktionalität
  * zu testen.
  */

  describe("create", () => {


    // Testet, ob eine neue Hilfsanzeige erstellt wird und zurückgegeben wird.
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


    // Testet, ob null ausgegeben wird, wenn die eingefügte Hilfsanzeige nicht 
    // gefunden wird.
    test("should return null if failed to find the inserted Hilfsanzeige", async () => {
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
      mockCollection.findOne.mockReturnValue(null);

      const newHilfsanzeige = {
        titel: "Test Titel",
        beschreibung: "Test Beschreibung",
        kategorie: "Test Kategorie",
        zeitraum: "Test Zeitraum",
        standort: "Test Standort",
        nutzername: "Test Nutzername",
      };
      const result = await service.create(newHilfsanzeige);

      expect(mockCollection.insertOne).toHaveBeenCalledWith(newHilfsanzeige);
      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: mockInsertedId,
      });
      expect(result).toBeNull();
    });
  });



/**
  * Unit Test für hilfsanzeige.service.test.js um die read-Funktionalität
  * zu testen.
  */

  describe("read", () => {


    // Testet, ob die durch die ID gefundene Hilfsanzeige zurückgegeben wird.
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


    // Testet, ob null ausgegeben wird, wenn die gesuchte Hilfsanzeige nicht
    // existiert.
    test("should return null if the Hilfsanzeige does not exist", async () => {
      const id = mockInsertedId.toHexString(); // Konvertiert ObjectId in einen gültigen hexadezimalen String
      mockCollection.findOne.mockReturnValue(null);

      const result = await service.read(id);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(id),
      });
      expect(result).toBeNull();
    });


    // Testet, ob die nicht vorhandene Hilfsanzeige mit der angegebenen ID behandelt wird.
    test("should handle non-existent Hilfsanzeige with the given ID", async () => {
      const nonExistentId = new ObjectId().toHexString();

      mockCollection.findOne.mockReturnValue(null);

      const result = await service.read(nonExistentId);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(nonExistentId),
      });
      expect(result).toBeNull();
    });
  });



/**
  * Unit Test für hilfsanzeige.service.test.js um die update-Funktionalität
  * zu testen.
  */

  describe("update", () => {


    // Testet, ob die Hilfsanzeige aktualisiert wird und die aktualisierten
    // Daten zurückgegeben werden.
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


    // Testet, ob undefined ausgegeben wird, wenn die Hilfsanzeige nicht existiert.
    test("should return undefined if the Hilfsanzeige does not exist", async () => {
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
      mockCollection.findOne.mockReturnValue(null);

      const result = await service.update(id, hilfsanzeige);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(id),
      });
      expect(mockCollection.updateOne).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });


    // Testet, ob die nicht existierende Hilfsanzeige mit den angegeben ID behandelt wird.
    test("should handle non-existent Hilfsanzeige with the given ID", async () => {
      const nonExistentId = new ObjectId().toHexString();
      const hilfsanzeige = {
        _id: nonExistentId,
        titel: "Neuer Titel",
        beschreibung: "Neue Beschreibung",
        kategorie: "Neue Kategorie",
        zeitraum: "Neuer Zeitraum",
        standort: "Neuer Standort",
        nutzername: "Neuer Nutzername",
      };

      mockCollection.findOne.mockReturnValue(null);

      const result = await service.update(nonExistentId, hilfsanzeige);

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(nonExistentId),
      });
      expect(mockCollection.updateOne).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });


    // Testet, ob null ausgegeben wird, wenn die aktualisierte Hilfsanzeige nach 
    // der Aktualisierung nicht gefunden wird.
    test("should return null if the updated Hilfsanzeige is not found after update", async () => {
      const id = mockInsertedId.toHexString();
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
      mockCollection.findOne.mockReturnValueOnce(hilfsanzeige).mockReturnValueOnce(null);

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
      expect(result).toBeNull();
    });
  });



/**
  * Unit Test für hilfsanzeige.service.test.js um die delete-Funktionalität
  * zu testen.
  */

  describe("delete", () => {


    // Testet, ob die Hilfsanzeige gelöscht wird und gibt die Anzahl der gelsöchten
    // Dokumente aus.
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


    // Testet, auf O ausgegeben wird, wenn die zu löschende Hilfsanzeige nicht 
    // existiert.
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


    // Testet, ob die nicht existierende Hilfsanzeige behandelt wird.
    test("should handle non-existent Hilfsanzeige with the given ID", async () => {
      const nonExistentId = new ObjectId().toHexString();

      mockCollection.deleteOne.mockReturnValue({ deletedCount: 0 });

      const result = await service.delete(nonExistentId);

      expect(mockCollection.deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(nonExistentId),
      });
      expect(result).toEqual(0);
    });
  });
});
