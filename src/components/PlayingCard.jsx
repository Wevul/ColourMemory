import { Box, Image} from "@chakra-ui/react";
import React from "react";
import cardBackside from "../assets/card_backside.png";
import styles from "../components/PlayingCard.module.css";

const PlayingCard = (props) => {

  const handleClick = (e) => {
    props.onClick(props);
  }

  return(
    <Box w="80px" h="100px" onClick={handleClick}>
      <Image src={cardBackside} position="absolute" 
        className={`${styles.card} ${(props.active || props.cleared) && styles.card_flip}`}/>
      <Box w="80px" h="100px" bgColor={props.color} position="absolute" 
        className={`${styles.card} ${!props.active && !props.cleared && styles.card_flip}`}/> 
    </Box>
  )
}

export default PlayingCard;