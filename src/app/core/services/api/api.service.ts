import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Router } from "@angular/router";
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
    private router : Router
    ) { }
  handleError(error: HttpErrorResponse){    

    if (error.error.message['name'] === 'TokenExpiredError' || error.error.message['name'] === 'JsonWebTokenError'){
      localStorage.removeItem('currentUser');
      localStorage.removeItem('koperasiData');
      window.location.href = window.location.origin
    }
    return throwError(error);
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
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
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
    return this.http.post(url, JSON.stringify(body), options).pipe(
      catchError(this.handleError)
      );
  }
  postsavepersonal(jenisidentitas,noidentitas,namalengkapsesuaiktp,tanggallahir,jeniskelamin,
    namagadisibukandung,statusperkawinan,pendidikanterakhir): Observable<any> {
    const url = '';
    let body = { "jenisidentitas": jenisidentitas, "noidentitas": noidentitas , "namalengkapsesuaiktp" : namalengkapsesuaiktp , "tanggallahir":tanggallahir,
    "jeniskelamin": jeniskelamin, "namagadisibukandung": namagadisibukandung ,"statusperkawinan": statusperkawinan, "pendidikanterakhir": pendidikanterakhir }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
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
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  postsaveoccupation(memilikinpwp,nomernpwp,pekerjausaha,bidangpekerjaanusaha,posisijabatan,
    namaperusahaanusaha,lamabekerjausaha,penghasilanomsetusaha,alamatkantorjalan,alamatkantornomer,alamatkantorrt,
    alamatkantorrw,alamatkantorkelurahan,alamatkantorkecamatan,alamatkantorkotaprovinsi): Observable<any> {
    const url = '';
    let body = { "memilikinpwp": memilikinpwp, "nomernpwp": nomernpwp , "pekerjausaha" : pekerjausaha , "bidangpekerjaanusaha":bidangpekerjaanusaha,
    "posisijabatan": posisijabatan, "namaperusahaanusaha": namaperusahaanusaha ,"lamabekerjausaha": lamabekerjausaha, "penghasilanomsetusaha": penghasilanomsetusaha,
    "alamatkantorjalan": alamatkantorjalan, "alamatkantornomer": alamatkantornomer ,"alamatkantorrt": alamatkantorrt, "alamatkantorrw": alamatkantorrw,
    "alamatkantorkelurahan": alamatkantorkelurahan, "alamatkantorkecamatan": alamatkantorkecamatan ,"alamatkantorkotaprovinsi": alamatkantorkotaprovinsi}
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  postsaveemergency(nama , nohandphone , hubungan): Observable<any> {
    const url = '';
    let body = { "nama": nama, "nohandphone": nohandphone , "hubungan" : hubungan }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  postchangepassword(paaswordlama , passwordbaru): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/users/change_password';
    let body = { "email":JSON.parse(localStorage.getItem('currentUser')).email, "password": paaswordlama, "password_new": passwordbaru}
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  getaccountao(): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/ao/admin_koperasi/' + JSON.parse(localStorage.getItem('currentUser')).userId;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  poststatusinactive(idao): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/ao/'+idao+'/status';
    let body = {"status":"inactive"}
    return this.http.put(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  poststatusactive(idao): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/ao/'+idao+'/status';
    let body = {"status":"active"}
    return this.http.put(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  getdetailaccountao(idao): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/ao/' + idao;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  updatedetailao(idao , fullname , hp ,email, birthdate): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/ao/'+idao;
    let body = {
      "fullname": fullname,
      "phone_mobile": hp,
      "email":email,
      "birthdate": birthdate,
    }
    return this.http.put(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }

  getalldatamember(){
    const url = 'http://dev-api.peers.id/api/v1/member_config/' + JSON.parse(localStorage.getItem('currentUser')).userId;
    // const url = 'http://dev-api.peers.id/api/v1/member/config/3';
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  postalldatamember(koperasi_id , jenis_identitas ,no_identitas, nama_lengkap , tanggal_lahir , tempat_lahir, jenis_kelamin , nama_gadis_ibu,
    status_perkawinan ,pendidikan_terakhir , alamat_ktp_jalan ,alamat_ktp_nomer,alamat_ktp_rt,alamat_ktp_rw,
    alamat_ktp_kelurahan,alamat_ktp_kecamatan,alamat_ktp_kota,alamat_ktp_provinsi,alamat_ktp_status_tempat_tinggal,alamat_ktp_lama_tinggal,domisili_sesuai_ktp,
    alamat_domisili_jalan,alamat_domisili_nomer,alamat_domisili_rt,alamat_domisili_rw,alamat_domisili_kelurahan,
    alamat_domisili_kecamatan,alamat_domisili_kota,alamat_domisili_provinsi,alamat_domisili_status_tempat_tinggal,alamat_domisili_lama_tempat_tinggal,memiliki_npwp,
    nomer_npwp , pekerja_usaha,bidang_pekerja,posisi_jabatan,nama_perusahaan,lama_bekerja,penghasilan_omset,alamat_kantor_jalan,
    alamat_kantor_nomer,alamat_kantor_rt,alamat_kantor_rw,alamat_kantor_kelurahan,alamat_kantor_kecamatan,alamat_kantor_kota,alamat_kantor_provinsi,
    nama,no_hp,hubungan){
    const url = 'http://dev-api.peers.id/api/v1/member_config'
    let body = {
    "koperasi_id": koperasi_id,
	  "member_handphone": 1,
    "jenis_identitas": jenis_identitas,
    "no_identitas": no_identitas,
    "nama_lengkap": nama_lengkap,
    "tanggal_lahir": tanggal_lahir,
    "tempat_lahir":tempat_lahir,
    "jenis_kelamin": jenis_kelamin,
    "nama_gadis_ibu": nama_gadis_ibu,
    "status_perkawinan": status_perkawinan,
    "pendidikan_terakhir": pendidikan_terakhir,
    "alamat_ktp_jalan": alamat_ktp_jalan,
    "alamat_ktp_nomer": alamat_ktp_nomer,
    "alamat_ktp_rt": alamat_ktp_rt,
    "alamat_ktp_rw": alamat_ktp_rw,
    "alamat_ktp_kelurahan": alamat_ktp_kelurahan,
    "alamat_ktp_kecamatan": alamat_ktp_kecamatan,
    "alamat_ktp_kota": alamat_ktp_kota,
    "alamat_ktp_provinsi": alamat_ktp_provinsi,
    "alamat_ktp_status_tempat_tinggal": alamat_ktp_status_tempat_tinggal,
    "alamat_ktp_lama_tinggal": alamat_ktp_lama_tinggal,
    "domisili_sesuai_ktp": domisili_sesuai_ktp,
    "alamat_domisili_jalan": alamat_domisili_jalan, 
    "alamat_domisili_nomer": alamat_domisili_nomer,
    "alamat_domisili_rt": alamat_domisili_rt,
    "alamat_domisili_rw": alamat_domisili_rw,
    "alamat_domisili_kelurahan": alamat_domisili_kelurahan,
    "alamat_domisili_kecamatan": alamat_domisili_kecamatan,
    "alamat_domisili_kota": alamat_domisili_kota,
    "alamat_domisili_provinsi": alamat_domisili_provinsi,
    "alamat_domisili_status_tempat_tinggal": alamat_domisili_status_tempat_tinggal,
    "alamat_domisili_lama_tempat_tinggal":alamat_domisili_lama_tempat_tinggal ,
    "memiliki_npwp": memiliki_npwp,
    "nomer_npwp": nomer_npwp,
    "pekerja_usaha": pekerja_usaha, 
    "bidang_pekerja": bidang_pekerja,
    "posisi_jabatan": posisi_jabatan,
    "nama_perusahaan": nama_perusahaan,
    "lama_bekerja": lama_bekerja,
    "penghasilan_omset": penghasilan_omset,
    "alamat_kantor_jalan": alamat_kantor_jalan,
    "alamat_kantor_nomer": alamat_kantor_nomer,
    "alamat_kantor_rt": alamat_kantor_rt,
    "alamat_kantor_rw": alamat_kantor_rw,
    "alamat_kantor_kelurahan": alamat_kantor_kelurahan,
    "alamat_kantor_kecamatan": alamat_kantor_kecamatan,
    "alamat_kantor_kota": alamat_kantor_kota,
    "alamat_kantor_provinsi": alamat_kantor_provinsi,
    "nama": nama,
    "no_hp": no_hp,
    "hubungan": hubungan 
    }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  postapprovalconfig(statusapproval): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/koperasi/approval/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id;
    let body = {
      "ao_can_approved": statusapproval
    }
    return this.http.put(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  getapprovalconfig(): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/koperasi/approval/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  postcutofftime(hours , minutes): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/koperasi/cutoff/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id;
    let body = {
      "hours": hours,
      "minutes":minutes
    }
    return this.http.put(url, JSON.stringify(body), this.options).pipe(
      catchError(this.handleError)
      );
  }
  getcutofftime(): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/koperasi/cutoff/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  postloanformula(formula): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan/formula';
    return this.http.post(url, JSON.stringify(formula), this.options).pipe(
      catchError(this.handleError)
      );
  }
  getloanformula(): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan/formula/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  getotherfee(): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan/other_fee/'+JSON.parse(localStorage.getItem('koperasiData')).formula_id;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  getloanapilcation(pagepagination,pagenavbar,order): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan_koperasi/'+JSON.parse(localStorage.getItem('currentUser')).koperasi_id+'?page='+pagepagination+'&row=10&column='+pagenavbar+'&sort='+order+'&status=0';
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  getviewloanapilcation(idloan): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan/'+idloan;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  getviewmemberloanapilcation(idmember): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/member/'+idmember;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  gethistoryloanapilcation(status,idmember): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan?status='+status+'&member_id='+idmember;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
  getstatusloanapplication(idmember , statusapprove): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/loan_approval/'+idmember+'/'+statusapprove;
    return this.http.get(url,this.options).pipe(
      catchError(this.handleError)
      );
  }
}
