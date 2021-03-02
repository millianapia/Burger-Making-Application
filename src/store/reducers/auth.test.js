import reducer  from "./auth"
import * as actionTypes from "../actions/actionTypes"

describe("auth reducer", ()=>{
    it("should return init state", ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null, 
            userId: null,
            error: null,
            loading: false,
        })
    })

    it("should store token upon login", ()=>{
        expect(reducer({
            token: null, 
            userId: null,
            error: null,
            loading: false,
        }, {type: actionTypes.AUTH_SUCCESS, 
            idToken: "some-t",
            userId: "userid",
            
        })).toEqual({
            token: "some-t", 
            userId: "userid",
            error: null,
            loading: false,
        })
    })
})