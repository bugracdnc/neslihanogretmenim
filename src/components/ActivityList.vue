<template>
    <div class="max-w-6xl mx-auto px-4">

        <div class="mb-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="relative w-full">
                <input v-model="searchQuery" type="text"
                    placeholder="Etkinlik, konu veya kelime ara... (örn: Matematik, 23 Nisan)"
                    class="w-full px-8 py-4 rounded-full border-2 border-pink-100 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all text-lg shadow-sm placeholder-slate-400 text-slate-700" />
                <span class="absolute right-6 top-4 text-2xl opacity-60">🌸</span>
            </div>

            <div
                class="flex items-center bg-white/80 backdrop-blur-sm p-1.5 rounded-[1.25rem] border-2 border-pink-100 shadow-sm shrink-0">
                <button @click="viewMode = 'grid'"
                    :class="viewMode === 'grid' ? 'bg-pink-100 text-pink-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                    class="p-2.5 rounded-xl transition-all duration-200" title="Grid Görünümü">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </button>
                <button @click="viewMode = 'list'"
                    :class="viewMode === 'list' ? 'bg-pink-100 text-pink-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                    class="p-2.5 rounded-xl transition-all duration-200" title="Liste Görünümü">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <TransitionGroup name="list" tag="div"
            :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-3 max-w-4xl mx-auto'">
            <div v-for="activity in filteredActivities" :key="activity.id"
                class="bg-white shadow-sm border border-amber-50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex"
                :class="viewMode === 'grid' ? 'rounded-[2.5rem] flex-col p-6 h-full hover:-translate-y-1' : 'rounded-2xl flex-col sm:flex-row items-start sm:items-center p-3 sm:pr-4 gap-4 hover:translate-x-1'">
                <div class="absolute bg-gradient-to-br from-amber-50 to-pink-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-700"
                    :class="viewMode === 'grid' ? '-right-8 -top-8 w-32 h-32' : '-right-4 -top-4 w-16 h-16'"></div>

                <div v-if="viewMode === 'grid'"
                    class="w-full h-48 mb-5 bg-pink-50/50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative border border-pink-100/50">
                    <img v-if="activity.thumbnail" :src="activity.thumbnail" alt=""
                        class="w-full h-full object-cover" />
                    <span v-else class="text-5xl opacity-50">🖼️</span>
                </div>

                <div v-else
                    class="hidden sm:flex w-16 h-16 bg-pink-50/50 rounded-xl items-center justify-center shrink-0 overflow-hidden relative border border-pink-100/50">
                    <img v-if="activity.thumbnail" :src="activity.thumbnail" alt=""
                        class="w-full h-full object-cover" />
                    <span v-else class="text-2xl opacity-50">🖼️</span>
                </div>

                <div class="relative z-10 flex-grow" :class="viewMode === 'list' && 'flex-1 min-w-0'">
                    <div class="flex items-center gap-2 mb-2" :class="viewMode === 'list' && 'mb-1'">
                        <span
                            class="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-[10px] sm:text-xs font-extrabold tracking-wide uppercase rounded-full whitespace-nowrap">
                            {{ activity.tag }}
                        </span>
                    </div>
                    <h3 class="font-bold text-slate-800"
                        :class="viewMode === 'grid' ? 'text-2xl mb-2' : 'text-lg truncate'">
                        {{ activity.title }}
                    </h3>
                    <p class="text-slate-500 leading-relaxed"
                        :class="viewMode === 'grid' ? '' : 'text-sm line-clamp-1'">
                        {{ activity.description }}
                    </p>
                </div>

                <div class="relative z-10"
                    :class="viewMode === 'grid' ? 'mt-auto pt-5 border-t border-pink-50/50 w-full' : 'w-full sm:w-auto shrink-0'">
                    <button
                        class="bg-gradient-to-r from-pink-200 to-amber-200 hover:from-pink-300 hover:to-amber-300 text-slate-800 font-bold transition-colors shadow-sm"
                        :class="viewMode === 'grid' ? 'w-full py-4 rounded-2xl text-lg' : 'w-full sm:w-auto py-2.5 px-6 rounded-xl text-sm'">
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

// 1. We added 'thumbnail?' to make it optional
interface Activity {
    id: number;
    title: string;
    description: string;
    tag: string;
    thumbnail?: string;
}

const props = defineProps<{
    activities: Activity[];
}>();

const searchQuery = ref('');
const viewMode = ref<'grid' | 'list'>('grid');

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
}
</style>