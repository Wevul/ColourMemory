import { useState } from 'react'
import { Button, Flex, Grid, GridItem, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import PlayingCard from './components/PlayingCard'

const CARD_COLORS = [
  "green.400",
  "red.400",
  "blue.400",
  "yellow.400",
  "pink.400",
  "teal.400",
  "purple.400",
  "orange.400"
]

const ALL_CARDS = [...CARD_COLORS, ...CARD_COLORS];

function App() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [isFlippable, setIsFlippable] = useState(true);
  const [cardsCleared, setCardsCleared] = useState(0);
  
  const shuffledCards = ALL_CARDS.sort(() => Math.random() - 0.5);
  const initialCards = shuffledCards.map((item, i) => {
    return {active: false, color: item, index: i};
  });

  const [playingCards, setPlayingCards] = useState(initialCards);
  
  const handleCardClick = (data) => {
    if(!data.active && !data.cleared && isFlippable) {
      if((count + 1)%2 === 0) {
        setIsFlippable(false);
        setTimeout(() => {
          setIsFlippable(true);
          setPlayingCards(state => {
            const [cardA, cardB] = state.filter(v => v.active && !v.cleared);
            if(cardA.color === cardB.color) {
              setScore((score) => score +1);
              setCardsCleared((cleared) => cleared +2);
              if(cardsCleared +2 === 16) {
                setIsFlippable(false);
                onOpen();
              }
              return state.map(v => v === cardA || v === cardB ? {...v, active: false, cleared: true} : {...v, active: false})
            }
            setScore((score) => score -1);
            return state.map(v => ({...v, active: false}))
          })
        }, 2000);
      } 
      setCount((count) => count + 1);
      setPlayingCards(state => { 
        return state.map(v => 
          v.index === data.index ? {...v, active: true} : {...v}
        )
      });
    }
  }

  const replay = () => {
    setScore(0);
    setCount(0);
    setCardsCleared(0);
    setIsFlippable(false);
    setPlayingCards(state => state.map(v => ({...v, active: false, cleared: false})));
    setTimeout(()=> {
      setIsFlippable(true);
      const shuffledCards = ALL_CARDS.sort(() => Math.random() - 0.5);
      setPlayingCards(shuffledCards.map((item, i) => {
        return {active: false, color: item, index: i};
      }));
    }, 1000)
    onClose();
  }

  return (
    <VStack spacing={10} mt="4">
      <Heading color="blue.400">Colour Memory Game!</Heading>
      <Grid gap={2} templateColumns='repeat(4, 1fr)'>
        {playingCards?.map((item) => {
          return <GridItem key={item.index}><PlayingCard active={item.active} color={item.color} index={item.index} cleared={item.cleared} onClick={handleCardClick} /></GridItem>
        })}
      </Grid>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Success!</ModalHeader>
            <ModalBody>
              Your score: {score}
            </ModalBody>
            <ModalFooter gap="2">
              <Button onClick={onClose}>Back to game</Button>
              <Button onClick={replay}>Play again?</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Flex bgColor="purple.300" borderRadius="4" w="200px" h="50px" alignItems="center" justifyContent="center">
        <Text fontSize="lg" as="b">Score: {score}</Text>
      </Flex>
      <Text>Cards clicked: {count}</Text>
    </VStack>
  )
}

export default App;
