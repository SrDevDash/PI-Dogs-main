import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailBreed } from "../../Redux/Actions/actions";
import style from "./details.module.css";
import Card from "./Card";

export default function Details() {
  const { id } = useParams();

  // get detail info by id param
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.detailsBreed);

  useEffect(() => {
    dispatch(detailBreed(id));
  }, [dispatch, id]);

  return (
    <div className={style.container}>{breed ? <Card /> : <p>Loading</p>}</div>
  );
}
