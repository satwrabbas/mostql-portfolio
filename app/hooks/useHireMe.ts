import Swal from "sweetalert2";
import { translations } from "../constants/translations";

export const useHireMe = (lang: "ar" | "en") => {
  const t = translations[lang];

  const handleHireMe = () => {
    Swal.fire({
      title: t.swalTitle,
      text: t.swalText,
      icon: "success",
      background: "#18181b",
      color: "#fff",
      confirmButtonText: "WhatsApp",
      confirmButtonColor: "#22c55e",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) window.open("https://wa.me/+963938457732", "_blank");
    });
  };

  return { handleHireMe };
};