import {isValidUrl} from "../src/client/js/urlValidation"

test("validation of url ",()=>{
    expect(isValidUrl("https://www.udacity.com/"))
        .toBe(true)

    expect(isValidUrl("hello World"))
        .toBe(false)
})