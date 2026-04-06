import { Box, Typography, Button } from "@mui/material";

type MenuItemType = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
};

type Props = {
    category: string;
    menu: MenuItemType[];
}

function MenuCardItem({ item }: { item: MenuItemType }) {
    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                borderRadius: 3,
                p: 1.5,
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.03)",
                },
            }}
        >
            {/* IMAGE */}
            <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                    width: "50%",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "12px",
                }}
            />

            {/* INFO */}
            <Typography fontWeight="bold" mt={1} fontSize="14px">
                {item.name}
            </Typography>

            <Typography
                sx={{
                    color: "#ff9800",
                    fontWeight: "bold",
                    fontSize: "13px",
                }}
            >
                Rp {item.price.toLocaleString()}
            </Typography>

            {/* BUTTON */}
            <Button
                fullWidth
                variant="contained"
                sx={{
                    mt: 1,
                    backgroundColor: "#ffcc00",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#ffb300",
                    },
                }}
            >
                + Tambah
            </Button>
        </Box>
    );
}

export default function MenuList() {
    const menu: MenuItemType[] = [
        {
            id: 1,
            name: "Big Mac",
            price: 35000,
            image: "/src/assets/burger/bigmac.webp",
            category: "Burger",
        },
        {
            id: 2,
            name: "CheeseBurger",
            price: 30000,
            image: "/src/assets/burger/cheeseburger.webp",
            category: "Burger",
        },
        {
            id: 3,
            name: "Coca Cola",
            price: 15000,
            image: "/src/assets/drinks/coca cola.png",
            category: "Drinks",
        },
    ];


    let filtered: MenuItemType[];
    const category = 'All';

    if (category === "All") {
        filtered = menu;
    } else {
        filtered = menu.filter((item) => item.category === category);
    }
    return (
        <Box>
            {/* TITLE */}
            {category !== "All" && (
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    {category}
                </Typography>
            )}
            {/* GRID */}
            {filtered.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                    }}
                >
                    {filtered.map((item) => (
                        <MenuCardItem key={item.id} item={item} />
                    ))}
                </Box>
            ) : (
                <Typography mt={4} sx={{
                    textAlign: "center"
                }}>
                    Menu tidak ditemukan
                </Typography>
            )}
        </Box>
    );
}
