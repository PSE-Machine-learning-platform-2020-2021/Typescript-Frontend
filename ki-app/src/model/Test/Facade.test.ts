import {Facade} from "../Facade"

test("Register", () => {
    let facade = new Facade("de-de")
    let promise = facade.registerAdmin("Hubert", "Hubert@test.de", "Hubert")
    promise.then((value: boolean) => {
        expect(value).toBe(true)
    })
  });

  test("Load ohne Login", () => {
      let facade = new Facade("de-de")
      let promise = facade.loadProject(0)
        promise.then((value: boolean) => {
        expect(value).toBe(false)
    })
  })

  test("Creat ohne Login", () => {
    let facade = new Facade("de-de")
    let promise = facade.createProject("TEST")
    promise.then((value: boolean) => {
      expect(value).toBe(false)
  })

  test("Creat mit Register", () => {
    let facade = new Facade("de-de")
    let promise1 = facade.registerAdmin("Hubert", "Hubert@test.de", "Hubert")
    promise1.then((value: boolean) => {
        expect(value).toBe(true)
    })
    let promise2 = facade.createProject("TEST")
    promise2.then((value: boolean) => {
      expect(value).toBe(true)
        })
    })
})