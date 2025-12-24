# RumeliSepeti

RumeliSepeti, BLG331 WEB Teknolojileri dönem projesi için hazırlanan mock verilerle çalışan modern bir React uygulamasıdır. Kullanıcılar menüyü keşfedebilir, ürün detaylarını inceleyebilir, sepetlerini yönetebilir, kupon kullanabilir, sipariş formunu doldurup Local Storage üzerinden geçmiş siparişlerine erişebilir.

## Özellikler

- 🚀 **React + Vite** altyapısı ve Context API ile global sepet/sipariş yönetimi
- 🧭 React Router v6 ile 7 farklı sayfa + 404 yönlendirmesi
- 🛒 Sepete ekleme, adet güncelleme, kupon/indirim, vergi ve toplam hesaplamaları
- 📦 Local Storage senkronizasyonu (sepet ve sipariş geçmişi sayfa yenilense bile korunur)
- 🧾 Kontrol edilen Checkout formu (adres, teslimat zamanı, ödeme yöntemi, sipariş notu)
- 🎯 Menü filtreleri (kategori, arama, fiyat sıralama), popüler ürünler, günün fırsatı ve hızlı kategori kartları
- 📱 Responsive tasarım + mobilde hamburger menü
- 🔔 Toast/Badge/Modal gibi tekrar kullanılabilir UI bileşenleri

## Kullanılan Teknolojiler

- React 18, React Router DOM 6
- Vite geliştirme sunucusu
- Context API + `useReducer`/`useState`
- SCSS tabanlı stiller
- Local Storage yardımcıları, özel formatlayıcılar

## Projeyi Çalıştırma

```bash
npm install
npm run dev
```

Vite varsayılan olarak `http://localhost:5173` adresinde çalışır. Üretim paketini oluşturmak için `npm run build` komutunu, derlenen çıktıyı önizlemek için `npm run preview` komutunu kullanabilirsiniz.

## Proje Yapısı

```
├── public/                # Favicon vb.
├── src/
│   ├── components/        # Layout, ürün, sepet, form ve UI bileşenleri
│   ├── contexts/          # CartContext & OrdersContext
│   ├── data/              # products, orders, coupons, categories mock verileri
│   ├── pages/             # Ana sayfa, Menü, Ürün Detay, Sepet, Checkout, Onay, Siparişler, 404
│   ├── styles/            # SCSS tabanlı global stiller
│   └── utils/             # Currency formatı, Local Storage, sipariş yardımcıları
├── index.html
├── package.json
└── vite.config.js
```

## Mock Veri Gereksinimleri

- `products.js`: 21 ürün, 6 kategori, porsiyon/ekstra seçenekleri, popülerlik/indirim bayrakları
- `orders.js`: Örnek siparişler (id, sipariş no, durum, kalemler, adres, tutarlar)
- `coupons.js`: En az 3 kupon (yüzdesel ve sabit indirim tipleri)

## Önemli Notlar

- Sepet ve sipariş geçmişi `localStorage` anahtarları (`rumeliesepeti-cart`, `rumeliesepeti-orders`) üzerinden saklanır.
- “Tekrar Sipariş Ver” butonu, geçmiş sipariş kalemlerini tekrar sepetinize yükler ve `/sepet` sayfasına yönlendirir.
- Ürün kartlarında hızlı “Sepete Ekle” butonu varsayılan konfigurasyonla çalışır; detaylı seçimler için ürün sayfasını kullanabilirsiniz.
- Checkout formu temel doğrulamaları içerir (ad, soyad, telefon regex, adres).

Hazır olduğunuzda `npm install && npm run dev` komutları ile projeyi çalıştırıp geliştirmeye devam edebilirsiniz. Bol şans!
