<script setup lang="ts">
import GameHeader from '@/components/GameHeader.vue';
import GameFigure from '@/components/GameFigure.vue';
import GameWrongLetters from '@/components/GameWrongLetters.vue';
import GameWord from '@/components/GameWord.vue';
import GamePopup from '@/components/GamePopup.vue';
import GameNotification from '@/components/GameNotification.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRandomWord } from '@/useRandomWord';
import { getLetters } from '@/helpers';

const { word, getRandomWord } = useRandomWord();
const { letters, correctLetters, wrongLetters } = getLetters(word);
const notification = ref<InstanceType<typeof GameNotification> | null>(null);
const popup = ref<InstanceType<typeof GamePopup> | null>(null);

const onKeydown = ({ key }: any) => {
  if (letters.value.includes(key.toLowerCase())) {
    notification.value?.open();

    setTimeout(() => {
      notification.value?.close();
    }, 2000);
    return;
  }

  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase());
  }
}

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
  window.addEventListener('keydown', onKeydown);
};

onMounted(async () => {
  await getRandomWord();
  window.addEventListener('keydown', onKeydown);
});

watch(wrongLetters, () => {
  if (wrongLetters.value.length === 6) {
    popup.value?.open('lose');
    window.removeEventListener('keydown', onKeydown);
  }
});
watch(correctLetters, () => {
  if (word.value.split('').every((w) => correctLetters.value.includes(w))) {
    popup.value?.open('win');
    window.removeEventListener('keydown', onKeydown);
  }
});
</script>

<template>
  <GameHeader />

  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length" />

    <GameWrongLetters :wrong-letters="wrongLetters" />

    <GameWord
      :word="word"
      :correct-letters="correctLetters"
    />
  </div>

  <GamePopup
    ref="popup"
    :word="word"
    @restart="restart"
  />

  <GameNotification ref="notification" />
</template>