export default function FormatPrice(price: number) {
    return "Rp." + price.toLocaleString("id-ID");
}