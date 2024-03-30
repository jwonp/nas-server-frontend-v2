import { expect, test, vi } from "vitest";
import { getPhoneString } from "@/utils/parsePhone";


test("test parseing phone", () => {
    //빈 문자열
    expect(getPhoneString("")).toBe("")
    //8자리
    expect(getPhoneString("02534123")).toBe("")


    //02 + 7자리
    expect(getPhoneString("025341237")).toBe("02-534-1237")
    //02 + 8자리
    expect(getPhoneString("0253541237")).toBe("02-5354-1237")
    //02이외 3자리 지역번호 + 7자리
    expect(getPhoneString("0324416679")).toBe("032-441-6679")
    //02이외 3자리 지역번호 + 8자리
    expect(getPhoneString("03214416679")).toBe("032-1441-6679")
});
