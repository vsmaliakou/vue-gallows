import { computed, ref, type Ref } from "vue";

export const getLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([]);
  const correctLetters = computed(() => letters.value.filter((letter) => word.value.includes(letter)));
  const wrongLetters = computed(() => letters.value.filter((letter) => !word.value.includes(letter)));

  return {
    letters,
    correctLetters,
    wrongLetters,
  };
};