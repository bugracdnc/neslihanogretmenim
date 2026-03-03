<template>
    <div class="max-w-6xl mx-auto px-4">
        <div class="mb-12 relative max-w-2xl mx-auto">
            <input v-model="searchQuery" type="text"
                placeholder="Etkinlik, konu veya kelime ara... (örn: Matematik, 23 Nisan)"
                class="w-full px-8 py-4 rounded-full border-2 border-pink-100 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all text-lg shadow-sm placeholder-slate-400 text-slate-700" />
            <span class="absolute right-6 top-4 text-2xl opacity-60">🌸</span>
        </div>

        <TransitionGroup name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="activity in filteredActivities" :key="activity.id"
                class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-amber-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                <div
                    class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-50 to-pink-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-700">
                </div>

                <div class="relative z-10 flex-grow">
                    <span
                        class="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 text-xs font-extrabold tracking-wide uppercase rounded-full mb-4">
                        {{ activity.tag }}
                    </span>
                    <h3 class="text-2xl font-bold text-slate-800 mb-3">{{ activity.title }}</h3>
                    <p class="text-slate-600 leading-relaxed mb-6">{{ activity.description }}</p>
                </div>

                <div class="relative z-10 mt-auto pt-6 border-t border-pink-50/50">
                    <button
                        class="w-full py-4 bg-gradient-to-r from-pink-200 to-amber-200 hover:from-pink-300 hover:to-amber-300 text-slate-800 font-bold rounded-2xl transition-colors shadow-sm text-lg">
                        İndir 📥
                    </button>
                </div>
            </div>
        </TransitionGroup>

        <div v-if="filteredActivities.length === 0" class="text-center py-20">
            <p class="text-2xl text-slate-500 font-medium">Bu aramaya uygun etkinlik bulunamadı 🌼</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// We define what an 'Activity' looks like
interface Activity {
    id: number;
    title: string;
    description: string;
    tag: string;
}

// The component accepts a list of activities from Astro
const props = defineProps<{
    activities: Activity[];
}>();

const searchQuery = ref('');

// This automatically filters the list whenever the user types
const filteredActivities = computed(() => {
    if (!searchQuery.value) return props.activities;

    const lowerQuery = searchQuery.value.toLowerCase();
    return props.activities.filter(a =>
        a.title.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.tag.toLowerCase().includes(lowerQuery)
    );
});
</script>

<style>
/* Vue TransitionGroup Classes for buttery smooth sorting/filtering */
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
}

.list-leave-active {
    position: absolute;
    /* Crucial: removes leaving items from flow so others slide into their place smoothly */
}
</style>