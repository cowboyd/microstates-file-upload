const rewire = require("rewire")
const uploader_controller = rewire("./uploader-controller")
const UploaderController = uploader_controller.__get__("UploaderController")
// @ponicode
describe("UploaderController", () => {
    test("0", () => {
        let callFunction = () => {
            UploaderController({ uploads: 11 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            UploaderController({ uploads: 2 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            UploaderController({ uploads: 256 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            UploaderController({ uploads: 128 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            UploaderController({ uploads: 80 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            UploaderController({ uploads: -Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})
