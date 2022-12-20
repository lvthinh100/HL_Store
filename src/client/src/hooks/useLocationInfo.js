import { useCallback, useEffect, useState } from "react";

import { addressAPI } from "../api";

export default function useLocationInfo() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    const fetchProvince = async () => {
      const { data } = await addressAPI.getAllProvinces();
      setProvinces(
        data.data.map((prov) => {
          return {
            value: prov.code,
            label: prov.name,
          };
        })
      );
    };
    fetchProvince();
  }, []);

  const fetchDistrict = async function (province) {
    const {
      data: { data },
    } = await addressAPI.getDistricts(province);
    setDistricts(
      data.map((el) => {
        return {
          value: el.id,
          label: el.name,
        };
      })
    );
  };

  const fetchWard = async function (province, district) {
    const {
      data: { data },
    } = await addressAPI.getWards(province, district);
    setWards(
      data.map((el) => {
        return {
          value: el,
          label: el,
        };
      })
    );
  };

  return { provinces, districts, wards, fetchDistrict, fetchWard };
}
