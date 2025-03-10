import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith(`/karyawan`)) {
    // jika url diawalai dengan/karyawan
    // ambil datatooken dair cookie
    const token = request.cookies.get(`token`)?.value;
    // prepare redirrct  to login
    const redirectLogin = request.nextUrl.clone();
    redirectLogin.pathname = "/"; //url halaman

    if (typeof token === undefined) {
      return NextResponse.redirect(redirectLogin);
    }
    const isVerifiedToken = await verifyKaryawan(token ?? "");
    if (!isVerifiedToken) return NextResponse.redirect(redirectLogin);
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith(`/pelanggan`)) {
    // jika url diawalai dengan/karyawan
    // ambil datatooken dair cookie
    const token = request.cookies.get(`token`)?.value;
    // prepare redirrct  to login
    const redirectLogin = request.nextUrl.clone();
    redirectLogin.pathname = "/"; //url halaman

    if (typeof token === undefined) {
      return NextResponse.redirect(redirectLogin);
    }
    const isVerifiedToken = await verifyPelanggan(token ?? "");
    if (!isVerifiedToken) return NextResponse.redirect(redirectLogin);
    return NextResponse.next();
  }
  return NextResponse.next();
};
export const config = {
  matcher: [
    "/karyawan/:path*",
    "/pelanggan/:path*",
    //menentukan rute mana saja yang akan memberlakukan proses middleware
  ],
};
