import PageLayout from "../layouts/page-layout";

export default function TNC() {
  return (
    <PageLayout>
      <div className="px-8 pt-40 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Syarat dan Ketentuan IBDA Kost
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Berikut adalah syarat dan ketentuan yang berlaku bagi penghuni IBDA
          Kost. Harap membaca dengan seksama untuk memastikan kenyamanan dan
          keamanan selama tinggal di IBDA Kost.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              1. Penerimaan Sewa dan Pembayaran
            </h2>
            <p className="text-gray-600">
              Dengan melakukan pemesanan dan/atau menyewa kamar di IBDA Kost,
              penyewa dianggap telah menerima syarat dan ketentuan yang
              tercantum dalam perjanjian ini. Pembayaran sewa kamar harus
              dilakukan sesuai dengan jadwal yang telah disepakati, baik melalui
              transfer bank maupun metode pembayaran lainnya yang ditentukan
              oleh pihak pengelola. Pembayaran yang dilakukan setelah tenggat
              waktu yang telah ditentukan akan dikenakan denda sesuai dengan
              kebijakan yang berlaku di IBDA Kost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              2. Ketentuan Penghuni
            </h2>
            <p className="text-gray-600">
              Penghuni IBDA Kost wajib menjaga ketertiban dan kebersihan area
              kost, termasuk kamar tidur, kamar mandi, serta fasilitas umum
              lainnya. Penghuni dilarang melakukan perbuatan yang dapat
              mengganggu kenyamanan penghuni lainnya, termasuk suara bising,
              perilaku yang tidak sopan, serta kegiatan yang melanggar hukum
              atau norma sosial yang berlaku. Setiap penghuni wajib menjaga
              keamanan dan kenyamanan kost selama masa sewa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              3. Penggunaan Fasilitas
            </h2>
            <p className="text-gray-600">
              Fasilitas yang tersedia di IBDA Kost, seperti internet, dapur
              bersama, ruang tamu, dan area parkir, hanya dapat digunakan oleh
              penghuni yang terdaftar. Penghuni tidak diperkenankan untuk
              membawa tamu ke dalam area kost tanpa izin dari pengelola.
              Penghuni bertanggung jawab atas kerusakan atau kehilangan
              fasilitas yang terjadi akibat kelalaian mereka.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              4. Durasi Sewa dan Pembatalan
            </h2>
            <p className="text-gray-600">
              Durasi sewa kamar di IBDA Kost dapat disesuaikan dengan
              kesepakatan antara pihak pengelola dan penghuni, baik secara
              bulanan maupun tahunan. Apabila penghuni ingin membatalkan kontrak
              sewa sebelum masa sewa berakhir, maka penghuni wajib memberi
              pemberitahuan minimal 30 hari sebelumnya. Pembatalan yang
              dilakukan kurang dari 30 hari akan dikenakan biaya pembatalan
              sesuai dengan kebijakan pengelola.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              5. Keamanan dan Tanggung Jawab
            </h2>
            <p className="text-gray-600">
              IBDA Kost berkomitmen untuk menjaga keamanan dan kenyamanan
              penghuni dengan menerapkan sistem keamanan yang baik. Namun, pihak
              pengelola tidak bertanggung jawab atas kehilangan barang pribadi
              penghuni atau kejadian yang terjadi di luar kendali pengelola.
              Penghuni disarankan untuk selalu mengunci kamar dan menyimpan
              barang berharga di tempat yang aman.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              6. Perubahan Syarat dan Ketentuan
            </h2>
            <p className="text-gray-600">
              IBDA Kost berhak untuk mengubah dan memperbarui syarat dan
              ketentuan ini dari waktu ke waktu. Setiap perubahan akan
              diinformasikan kepada penghuni melalui pengumuman di tempat umum
              atau melalui media komunikasi lain yang tersedia. Penghuni
              diharapkan untuk selalu memperhatikan dan mematuhi perubahan
              ketentuan yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              7. Larangan Merokok dan Penggunaan Narkoba
            </h2>
            <p className="text-gray-600">
              Merokok di dalam area kamar atau fasilitas umum IBDA Kost
              dilarang. Penghuni yang kedapatan merokok atau menggunakan narkoba
              akan dikenakan tindakan tegas, termasuk pemutusan kontrak sewa dan
              pengusiran tanpa kompensasi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              8. Kebijakan Privasi
            </h2>
            <p className="text-gray-600">
              Pengelola IBDA Kost berkomitmen untuk menjaga kerahasiaan data
              pribadi penghuni sesuai dengan kebijakan privasi yang berlaku.
              Data pribadi yang dikumpulkan akan digunakan untuk tujuan
              administrasi sewa dan tidak akan disebarluaskan kepada pihak
              ketiga tanpa izin penghuni, kecuali jika diperlukan oleh hukum
              yang berlaku.
            </p>
          </section>
        </div>

        <p className="text-lg text-gray-700 mt-8">
          Anda dapat menyesuaikan dan memperluas ketentuan ini sesuai dengan
          kebijakan khusus yang berlaku di IBDA Kost. Pastikan untuk
          mencantumkan informasi yang jelas mengenai hak dan kewajiban penghuni
          serta ketentuan yang berlaku di kost tersebut.
        </p>
      </div>
    </PageLayout>
  );
}
