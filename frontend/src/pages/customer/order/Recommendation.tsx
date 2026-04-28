import { Box, Button, Typography } from "@mui/material";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Recomendation({ onNext }: PackageSelectionProps) {

    const recommendation = [
        {
            name: "Big Mac",
            price: 35000,
            image: "/public/burger/bigmac.webp",
        }, {
            name: "Big Mac",
            price: 35000,
            image: "/public/burger/bigmac.webp",
        },
        {
            name: "Big Mac",
            price: 35000,
            image: "/public/burger/bigmac.webp",
        },
        {
            name: "Big Mac",
            price: 35000,
            image: "/public/burger/bigmac.webp",
        },
        {
            name: "Big Mac",
            price: 35000,
            image: "/public/burger/bigmac.webp",
        }
    ]

    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "32px",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }}>
        <Typography component={"h1"} sx={{
            fontSize: "24px",
            fontWeight: "600"
        }}>Boleh kami menyarankan</Typography>

        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap"
        }}>
            {recommendation.map((item, index) => <Box
                key={index}
                sx={{
                    width: "150px",
                    height: "180px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: "4px",
                    padding: "12px",
                    cursor: "pointer"
                }}
                onClick={() => {
                    onNext("checkout");
                }}
            >
                <img src={item.image} alt="" style={{ width: "100px", height: "100px" }}
                    onError={(e) => {
                        e.currentTarget.src = "https://blocks.astratic.com/img/general-img-landscape.png";
                    }}
                />
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography component={"h1"} sx={{
                        fontWeight: "600",
                        fontSize: "12px"
                    }}>{item.name}</Typography>
                    <Typography component={"h1"} sx={{
                        fontWeight: "400",
                        fontSize: "12px"
                    }}>Rp. {item.price.toLocaleString("de-DE")}</Typography>
                </Box>
            </Box>)}
        </Box>

        <Button variant="outlined" onClick={() => onNext("cart")} sx={{
            color: "black",
            border: "1px solid rgba(0,0,0,0.2)",
            height: "40px",
            borderRadius: "0px",
            textTransform: "none",
            width: "calc(100% - 24px)"
        }}>Tidak</Button>
    </Box>
}