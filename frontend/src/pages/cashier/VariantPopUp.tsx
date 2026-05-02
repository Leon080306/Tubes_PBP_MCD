/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, FormControlLabel, Checkbox, Radio, RadioGroup
} from "@mui/material";
import { useState } from "react";
import type { Menu } from "../../type";

type Props = {
    open: boolean;
    onClose: () => void;
    menu: Menu | null;
    onConfirm: (payload: {
        selectedVariants: any[];
        selectedOptions: any[];
        price: number;
    }) => void;
};

export default function VariantModal({ open, onClose, menu, onConfirm }: Props) {
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    if (!menu) return null;

    const variants = menu.mvs || [];
    const options = menu.mos || [];

    const toggleOption = (id: string) => {
        setSelectedOptions((prev) =>
            prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
        );
    };

    const handleConfirm = () => {
        const pickedVariant = variants.find(v => v.mv_id === selectedVariantId);
        const pickedOptions = options.filter(o => selectedOptions.includes(o.mo_id));

        let price = menu.harga_awal;
        if (pickedVariant) price += pickedVariant.harga_tambahan;
        pickedOptions.forEach(o => price += o.tambahan_harga);

        onConfirm({
            selectedVariants: pickedVariant ? [pickedVariant] : [],
            selectedOptions: pickedOptions,
            price
        });

        setSelectedVariantId(null);
        setSelectedOptions([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{menu.nama}</DialogTitle>

            <DialogContent>
                {variants.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Pilih Varian</Typography>
                        <RadioGroup
                            value={selectedVariantId || ""}
                            onChange={(e) => setSelectedVariantId(e.target.value)}
                        >
                            {variants.map(v => (
                                <FormControlLabel
                                    key={v.mv_id}
                                    value={v.mv_id}
                                    control={<Radio />}
                                    label={`${v.nama_varian} (+Rp ${v.harga_tambahan.toLocaleString()})`}
                                />
                            ))}
                        </RadioGroup>
                    </Box>
                )}

                {options.length > 0 && (
                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Tambahan</Typography>
                        {options.map(o => (
                            <FormControlLabel
                                key={o.mo_id}
                                control={
                                    <Checkbox
                                        checked={selectedOptions.includes(o.mo_id)}
                                        onChange={() => toggleOption(o.mo_id)}
                                    />
                                }
                                label={`${o.nama_option} (+Rp ${o.tambahan_harga.toLocaleString()})`}
                            />
                        ))}
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Batal</Button>
                <Button variant="contained" onClick={handleConfirm}>
                    Tambah
                </Button>
            </DialogActions>
        </Dialog>
    );
}