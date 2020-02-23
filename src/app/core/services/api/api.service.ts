import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders({ 
    'content-type': 'application/json', 
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
  });
  options = { headers: this.headers };
  constructor(private http: HttpClient,
    ) { }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  postdatakoperasi(nama_koperasi,no_badan_hukum,tgl_badan_hukum,
    no_perubahan_anggaran_dasar,
    tgl_perubahan_anggaran_dasar,
    tgl_rat_terakhir,
    alamat,
    kelurahan_desa,
    kecamatan,
    kabupaten,
    provinsi,
    bentuk_koperasi,
    jenis_koperasi,
    kelompok_koperasi,
    sektor_usaha,
    nama_ketua,
    nama_sekretaris,
    nama_bendahara,
    foto_ktp_ketua,
    jml_anggota_pria,
    jml_anggota_wanita,
    total_anggota,
    total_manajer,
    total_karyawan,
    no_induk_koperasi,
    status_nik,
    status_grade,
    hp_pengurus,
    email_pengurus
     ): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/koperasi';
    let body = { 
      "nama_koperasi": nama_koperasi, 
      "no_badan_hukum": no_badan_hukum , 
      "tgl_badan_hukum":tgl_badan_hukum,
      "no_perubahan_anggaran_dasar":no_perubahan_anggaran_dasar,
      "tgl_perubahan_anggaran_dasar":tgl_perubahan_anggaran_dasar,
      "tgl_rat_terakhir":tgl_rat_terakhir,
      "alamat":alamat,
      "kelurahan_desa":kelurahan_desa,
      "kecamatan":kecamatan,
      "kabupaten":kabupaten,
      "provinsi":provinsi,
      "bentuk_koperasi":bentuk_koperasi,
      "jenis_koperasi":jenis_koperasi,
      "kelompok_koperasi":kelompok_koperasi,
      "sektor_usaha":sektor_usaha,
      "nama_ketua":nama_ketua,
      "nama_sekretaris":nama_sekretaris,
      "nama_bendahara":nama_bendahara,
      "foto_ktp_ketua":foto_ktp_ketua,
      "jml_anggota_pria":jml_anggota_pria,
      "jml_anggota_wanita":jml_anggota_wanita,
      "total_anggota":total_anggota,
      "total_manajer":total_manajer,
      "total_karyawan":total_karyawan,
      "no_induk_koperasi":no_induk_koperasi,
      "status_nik":status_nik,
      "status_grade":status_grade,
      "hp_pengurus":hp_pengurus,
      "email_pengurus":email_pengurus
   }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  postcreateaccountmanagement(fullname , hp , email , birthday): Observable<any> {
    const headers = new HttpHeaders({ 
      'content-type': 'application/json', 
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
      'uid':JSON.parse(localStorage.getItem('currentUser')).userId
    });
    const options = { headers: headers };
    const url = 'http://dev-api.peers.id/api/v1/ao';
    let body = { "fullname": fullname, "phone_mobile": hp , "email" : email , "birthdate":birthday }
    return this.http.post(url, JSON.stringify(body), options).pipe(map(res => res))
  }
  postsavepersonal(jenisidentitas,noidentitas,namalengkapsesuaiktp,tanggallahir,jeniskelamin,
    namagadisibukandung,statusperkawinan,pendidikanterakhir): Observable<any> {
    const url = '';
    let body = { "jenisidentitas": jenisidentitas, "noidentitas": noidentitas , "namalengkapsesuaiktp" : namalengkapsesuaiktp , "tanggallahir":tanggallahir,
    "jeniskelamin": jeniskelamin, "namagadisibukandung": namagadisibukandung ,"statusperkawinan": statusperkawinan, "pendidikanterakhir": pendidikanterakhir }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  postsaveaddress(jalan,nomer,rt,rw,kelurahan,
    kecamatan,statustempattinggalktp,lamatinggalktp,apakahalamatsesuaidomisili,domisilijalan,
    domisilinomer,domisilirt,domisilirw,domisilikelurahan,domisilikecamatan,kotaprovinsi,statustempattinggal,lamatinggal): Observable<any> {
    const url = '';
    let body = { "jalan": jalan, "nomer": nomer , "rt" : rt , "rw":rw,
    "kelurahan": kelurahan, "kecamatan": kecamatan ,"statustempattinggalktp": statustempattinggalktp, "lamatinggalktp": lamatinggalktp,
    "apakahalamatsesuaidomisili": apakahalamatsesuaidomisili, "domisilijalan": domisilijalan ,"domisilinomer": domisilinomer, "domisilirt": domisilirt,
    "domisilirw": domisilirw, "domisilikelurahan": domisilikelurahan ,"domisilikecamatan": domisilikecamatan, "kotaprovinsi": kotaprovinsi,
    "statustempattinggal": statustempattinggal, "lamatinggal": lamatinggal
   }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  postsaveoccupation(memilikinpwp,nomernpwp,pekerjausaha,bidangpekerjaanusaha,posisijabatan,
    namaperusahaanusaha,lamabekerjausaha,penghasilanomsetusaha,alamatkantorjalan,alamatkantornomer,alamatkantorrt,
    alamatkantorrw,alamatkantorkelurahan,alamatkantorkecamatan,alamatkantorkotaprovinsi): Observable<any> {
    const url = '';
    let body = { "memilikinpwp": memilikinpwp, "nomernpwp": nomernpwp , "pekerjausaha" : pekerjausaha , "bidangpekerjaanusaha":bidangpekerjaanusaha,
    "posisijabatan": posisijabatan, "namaperusahaanusaha": namaperusahaanusaha ,"lamabekerjausaha": lamabekerjausaha, "penghasilanomsetusaha": penghasilanomsetusaha,
    "alamatkantorjalan": alamatkantorjalan, "alamatkantornomer": alamatkantornomer ,"alamatkantorrt": alamatkantorrt, "alamatkantorrw": alamatkantorrw,
    "alamatkantorkelurahan": alamatkantorkelurahan, "alamatkantorkecamatan": alamatkantorkecamatan ,"alamatkantorkotaprovinsi": alamatkantorkotaprovinsi}
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  postsaveemergency(nama , nohandphone , hubungan): Observable<any> {
    const url = '';
    let body = { "nama": nama, "nohandphone": nohandphone , "hubungan" : hubungan }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  postchangepassword(paaswordlama , passwordbaru , ulangipassword): Observable<any> {
    const url = '';
    let body = { "paaswordlama": paaswordlama, "passwordbaru": passwordbaru , "ulangipassword" : ulangipassword}
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
}
