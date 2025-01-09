<script>
	import { onMount } from 'svelte';
	import { keyWatcherConfig, KeyWatcherMode, selectedShapes } from '$lib/shared.svelte';

	const colors = [
		// Gray
		{ 'name': 'gray-50', 'rgb': 'rgb(249, 250, 251)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-100', 'rgb': 'rgb(243, 244, 246)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-200', 'rgb': 'rgb(229, 231, 235)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-300', 'rgb': 'rgb(209, 213, 219)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-400', 'rgb': 'rgb(156, 163, 175)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-500', 'rgb': 'rgb(107, 114, 128)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-600', 'rgb': 'rgb(75, 85, 99)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-700', 'rgb': 'rgb(55, 65, 81)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-800', 'rgb': 'rgb(31, 41, 55)', 'families': ['gray', 'tailwind'] },
		{ 'name': 'gray-900', 'rgb': 'rgb(17, 24, 39)', 'families': ['gray', 'tailwind'] },
		// Red
		{
			'name': 'red-50',
			'rgb': 'rgb(254, 242, 242)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-100',
			'rgb': 'rgb(254, 226, 226)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-200',
			'rgb': 'rgb(254, 202, 202)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-300',
			'rgb': 'rgb(252, 165, 165)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-400',
			'rgb': 'rgb(248, 113, 113)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-500',
			'rgb': 'rgb(239, 68, 68)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-600',
			'rgb': 'rgb(220, 38, 38)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-700',
			'rgb': 'rgb(185, 28, 28)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-800',
			'rgb': 'rgb(153, 27, 27)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-900',
			'rgb': 'rgb(127, 29, 29)',
			'families': ['red', 'tailwind']
		},
		{
			'name': 'red-950',
			'rgb': 'rgb(69, 10, 10)',
			'families': ['red', 'tailwind']
		},

		// Orange
		{
			'name': 'orange-50',
			'rgb': 'rgb(255, 247, 237)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-100',
			'rgb': 'rgb(255, 237, 213)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-200',
			'rgb': 'rgb(254, 215, 170)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-300',
			'rgb': 'rgb(253, 186, 116)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-400',
			'rgb': 'rgb(251, 146, 60)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-500',
			'rgb': 'rgb(249, 115, 22)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-600',
			'rgb': 'rgb(234, 88, 12)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-700',
			'rgb': 'rgb(194, 65, 12)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-800',
			'rgb': 'rgb(154, 52, 18)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-900',
			'rgb': 'rgb(124, 45, 18)',
			'families': ['orange', 'tailwind']
		},
		{
			'name': 'orange-950',
			'rgb': 'rgb(67, 20, 7)',
			'families': ['orange', 'tailwind']
		},

		// Amber
		{
			'name': 'amber-50',
			'rgb': 'rgb(255, 251, 235)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-100',
			'rgb': 'rgb(254, 243, 199)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-200',
			'rgb': 'rgb(253, 230, 138)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-300',
			'rgb': 'rgb(252, 211, 77)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-400',
			'rgb': 'rgb(251, 191, 36)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-500',
			'rgb': 'rgb(245, 158, 11)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-600',
			'rgb': 'rgb(217, 119, 6)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-700',
			'rgb': 'rgb(180, 83, 9)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-800',
			'rgb': 'rgb(146, 64, 14)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-900',
			'rgb': 'rgb(120, 53, 15)',
			'families': ['amber', 'tailwind']
		},
		{
			'name': 'amber-950',
			'rgb': 'rgb(69, 26, 3)',
			'families': ['amber', 'tailwind']
		},

		// Yellow
		{
			'name': 'yellow-50',
			'rgb': 'rgb(254, 252, 232)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-100',
			'rgb': 'rgb(254, 249, 195)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-200',
			'rgb': 'rgb(254, 240, 138)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-300',
			'rgb': 'rgb(253, 224, 71)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-400',
			'rgb': 'rgb(250, 204, 21)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-500',
			'rgb': 'rgb(234, 179, 8)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-600',
			'rgb': 'rgb(202, 138, 4)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-700',
			'rgb': 'rgb(161, 98, 7)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-800',
			'rgb': 'rgb(133, 77, 14)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-900',
			'rgb': 'rgb(113, 63, 18)',
			'families': ['yellow', 'tailwind']
		},
		{
			'name': 'yellow-950',
			'rgb': 'rgb(66, 32, 6)',
			'families': ['yellow', 'tailwind']
		},

		// Lime
		{
			'name': 'lime-50',
			'rgb': 'rgb(247, 254, 231)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-100',
			'rgb': 'rgb(236, 252, 203)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-200',
			'rgb': 'rgb(217, 249, 157)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-300',
			'rgb': 'rgb(190, 242, 100)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-400',
			'rgb': 'rgb(163, 230, 53)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-500',
			'rgb': 'rgb(132, 204, 22)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-600',
			'rgb': 'rgb(101, 163, 13)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-700',
			'rgb': 'rgb(77, 124, 15)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-800',
			'rgb': 'rgb(63, 98, 18)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-900',
			'rgb': 'rgb(54, 83, 20)',
			'families': ['lime', 'tailwind']
		},
		{
			'name': 'lime-950',
			'rgb': 'rgb(26, 46, 5)',
			'families': ['lime', 'tailwind']
		},

		// Green
		{
			'name': 'green-50',
			'rgb': 'rgb(240, 253, 244)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-100',
			'rgb': 'rgb(220, 252, 231)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-200',
			'rgb': 'rgb(187, 247, 208)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-300',
			'rgb': 'rgb(134, 239, 172)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-400',
			'rgb': 'rgb(74, 222, 128)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-500',
			'rgb': 'rgb(34, 197, 94)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-600',
			'rgb': 'rgb(22, 163, 74)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-700',
			'rgb': 'rgb(21, 128, 61)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-800',
			'rgb': 'rgb(22, 101, 52)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-900',
			'rgb': 'rgb(20, 83, 45)',
			'families': ['green', 'tailwind']
		},
		{
			'name': 'green-950',
			'rgb': 'rgb(5, 46, 22)',
			'families': ['green', 'tailwind']
		},

		// Emerald
		{
			'name': 'emerald-50',
			'rgb': 'rgb(236, 253, 245)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-100',
			'rgb': 'rgb(209, 250, 229)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-200',
			'rgb': 'rgb(167, 243, 208)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-300',
			'rgb': 'rgb(110, 231, 183)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-400',
			'rgb': 'rgb(52, 211, 153)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-500',
			'rgb': 'rgb(16, 185, 129)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-600',
			'rgb': 'rgb(5, 150, 105)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-700',
			'rgb': 'rgb(4, 120, 87)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-800',
			'rgb': 'rgb(6, 95, 70)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-900',
			'rgb': 'rgb(6, 78, 59)',
			'families': ['emerald', 'tailwind']
		},
		{
			'name': 'emerald-950',
			'rgb': 'rgb(2, 44, 34)',
			'families': ['emerald', 'tailwind']
		},

		// Teal
		{
			'name': 'teal-50',
			'rgb': 'rgb(240, 253, 250)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-100',
			'rgb': 'rgb(204, 251, 241)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-200',
			'rgb': 'rgb(153, 246, 228)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-300',
			'rgb': 'rgb(94, 234, 212)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-400',
			'rgb': 'rgb(45, 212, 191)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-500',
			'rgb': 'rgb(20, 184, 166)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-600',
			'rgb': 'rgb(13, 148, 136)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-700',
			'rgb': 'rgb(15, 118, 110)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-800',
			'rgb': 'rgb(17, 94, 89)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-900',
			'rgb': 'rgb(19, 78, 74)',
			'families': ['teal', 'tailwind']
		},
		{
			'name': 'teal-950',
			'rgb': 'rgb(4, 47, 46)',
			'families': ['teal', 'tailwind']
		},

		// Cyan
		{
			'name': 'cyan-50',
			'rgb': 'rgb(236, 254, 255)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-100',
			'rgb': 'rgb(207, 250, 254)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-200',
			'rgb': 'rgb(165, 243, 252)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-300',
			'rgb': 'rgb(103, 232, 249)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-400',
			'rgb': 'rgb(34, 211, 238)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-500',
			'rgb': 'rgb(6, 182, 212)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-600',
			'rgb': 'rgb(8, 145, 178)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-700',
			'rgb': 'rgb(14, 116, 144)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-800',
			'rgb': 'rgb(21, 94, 117)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-900',
			'rgb': 'rgb(22, 78, 99)',
			'families': ['cyan', 'tailwind']
		},
		{
			'name': 'cyan-950',
			'rgb': 'rgb(8, 51, 68)',
			'families': ['cyan', 'tailwind']
		},

		// Sky
		{
			'name': 'sky-50',
			'rgb': 'rgb(240, 249, 255)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-100',
			'rgb': 'rgb(224, 242, 254)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-200',
			'rgb': 'rgb(186, 230, 253)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-300',
			'rgb': 'rgb(125, 211, 252)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-400',
			'rgb': 'rgb(56, 189, 248)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-500',
			'rgb': 'rgb(14, 165, 233)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-600',
			'rgb': 'rgb(2, 132, 199)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-700',
			'rgb': 'rgb(3, 105, 161)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-800',
			'rgb': 'rgb(7, 89, 133)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-900',
			'rgb': 'rgb(12, 74, 110)',
			'families': ['sky', 'tailwind']
		},
		{
			'name': 'sky-950',
			'rgb': 'rgb(8, 47, 73)',
			'families': ['sky', 'tailwind']
		},

		// Blue
		{
			'name': 'blue-50',
			'rgb': 'rgb(239, 246, 255)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-100',
			'rgb': 'rgb(219, 234, 254)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-200',
			'rgb': 'rgb(191, 219, 254)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-300',
			'rgb': 'rgb(147, 197, 253)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-400',
			'rgb': 'rgb(96, 165, 250)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-500',
			'rgb': 'rgb(59, 130, 246)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-600',
			'rgb': 'rgb(37, 99, 235)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-700',
			'rgb': 'rgb(29, 78, 216)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-800',
			'rgb': 'rgb(30, 64, 175)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-900',
			'rgb': 'rgb(30, 58, 138)',
			'families': ['blue', 'tailwind']
		},
		{
			'name': 'blue-950',
			'rgb': 'rgb(23, 37, 84)',
			'families': ['blue', 'tailwind']
		},

		// Indigo
		{
			'name': 'indigo-50',
			'rgb': 'rgb(238, 242, 255)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-100',
			'rgb': 'rgb(224, 231, 255)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-200',
			'rgb': 'rgb(199, 210, 254)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-300',
			'rgb': 'rgb(165, 180, 252)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-400',
			'rgb': 'rgb(129, 140, 248)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-500',
			'rgb': 'rgb(99, 102, 241)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-600',
			'rgb': 'rgb(79, 70, 229)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-700',
			'rgb': 'rgb(67, 56, 202)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-800',
			'rgb': 'rgb(55, 48, 163)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-900',
			'rgb': 'rgb(49, 46, 129)',
			'families': ['indigo', 'tailwind']
		},
		{
			'name': 'indigo-950',
			'rgb': 'rgb(30, 27, 75)',
			'families': ['indigo', 'tailwind']
		},
		// Violet
		{
			'name': 'violet-50',
			'rgb': 'rgb(245, 243, 255)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-100',
			'rgb': 'rgb(237, 233, 254)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-200',
			'rgb': 'rgb(221, 214, 254)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-300',
			'rgb': 'rgb(196, 181, 253)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-400',
			'rgb': 'rgb(167, 139, 250)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-500',
			'rgb': 'rgb(139, 92, 246)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-600',
			'rgb': 'rgb(124, 58, 237)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-700',
			'rgb': 'rgb(109, 40, 217)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-800',
			'rgb': 'rgb(91, 33, 182)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-900',
			'rgb': 'rgb(76, 29, 149)',
			'families': ['violet', 'tailwind']
		},
		{
			'name': 'violet-950',
			'rgb': 'rgb(46, 16, 101)',
			'families': ['violet', 'tailwind']
		},

		// Purple
		{
			'name': 'purple-50',
			'rgb': 'rgb(250, 245, 255)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-100',
			'rgb': 'rgb(243, 232, 255)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-200',
			'rgb': 'rgb(233, 213, 255)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-300',
			'rgb': 'rgb(216, 180, 254)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-400',
			'rgb': 'rgb(192, 132, 252)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-500',
			'rgb': 'rgb(168, 85, 247)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-600',
			'rgb': 'rgb(147, 51, 234)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-700',
			'rgb': 'rgb(126, 34, 206)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-800',
			'rgb': 'rgb(107, 33, 168)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-900',
			'rgb': 'rgb(88, 28, 135)',
			'families': ['purple', 'tailwind']
		},
		{
			'name': 'purple-950',
			'rgb': 'rgb(59, 7, 100)',
			'families': ['purple', 'tailwind']
		},

		// Fuchsia
		{
			'name': 'fuchsia-50',
			'rgb': 'rgb(253, 244, 255)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-100',
			'rgb': 'rgb(250, 232, 255)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-200',
			'rgb': 'rgb(245, 208, 254)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-300',
			'rgb': 'rgb(240, 171, 252)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-400',
			'rgb': 'rgb(232, 121, 249)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-500',
			'rgb': 'rgb(217, 70, 239)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-600',
			'rgb': 'rgb(192, 38, 211)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-700',
			'rgb': 'rgb(162, 28, 175)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-800',
			'rgb': 'rgb(134, 25, 143)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-900',
			'rgb': 'rgb(112, 26, 117)',
			'families': ['fuchsia', 'tailwind']
		},
		{
			'name': 'fuchsia-950',
			'rgb': 'rgb(74, 4, 78)',
			'families': ['fuchsia', 'tailwind']
		},

		// Pink
		{
			'name': 'pink-50',
			'rgb': 'rgb(253, 242, 248)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-100',
			'rgb': 'rgb(252, 231, 243)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-200',
			'rgb': 'rgb(251, 207, 232)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-300',
			'rgb': 'rgb(249, 168, 212)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-400',
			'rgb': 'rgb(244, 114, 182)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-500',
			'rgb': 'rgb(236, 72, 153)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-600',
			'rgb': 'rgb(219, 39, 119)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-700',
			'rgb': 'rgb(190, 24, 93)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-800',
			'rgb': 'rgb(157, 23, 77)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-900',
			'rgb': 'rgb(131, 24, 67)',
			'families': ['pink', 'tailwind']
		},
		{
			'name': 'pink-950',
			'rgb': 'rgb(80, 7, 36)',
			'families': ['pink', 'tailwind']
		},

		// Rose
		{
			'name': 'rose-50',
			'rgb': 'rgb(255, 241, 242)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-100',
			'rgb': 'rgb(255, 228, 230)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-200',
			'rgb': 'rgb(254, 205, 211)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-300',
			'rgb': 'rgb(253, 164, 175)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-400',
			'rgb': 'rgb(251, 113, 133)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-500',
			'rgb': 'rgb(244, 63, 94)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-600',
			'rgb': 'rgb(225, 29, 72)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-700',
			'rgb': 'rgb(190, 18, 60)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-800',
			'rgb': 'rgb(159, 18, 57)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-900',
			'rgb': 'rgb(136, 19, 55)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'rose-950',
			'rgb': 'rgb(76, 5, 25)',
			'families': ['rose', 'tailwind']
		},
		{
			'name': 'AliceBlue',
			'hex': '#F0F8FF',
			'rgb': 'rgb(240, 248, 255)',
			'families': ['blue', 'white']
		},
		{
			'name': 'AntiqueWhite',
			'hex': '#FAEBD7',
			'rgb': 'rgb(250, 235, 215)',
			'families': ['white', 'brown']
		},
		{
			'name': 'Aqua',
			'hex': '#00FFFF',
			'rgb': 'rgb(0, 255, 255)',
			'families': ['blue', 'cyan']
		},
		{
			'name': 'Aquamarine',
			'hex': '#7FFFD4',
			'rgb': 'rgb(127, 255, 212)',
			'families': ['green', 'blue']
		},
		{
			'name': 'Azure',
			'hex': '#F0FFFF',
			'rgb': 'rgb(240, 255, 255)',
			'families': ['blue', 'white']
		},
		{
			'name': 'Beige',
			'hex': '#F5F5DC',
			'rgb': 'rgb(245, 245, 220)',
			'families': ['white', 'brown']
		},
		{
			'name': 'Bisque',
			'hex': '#FFE4C4',
			'rgb': 'rgb(255, 228, 196)',
			'families': ['brown', 'orange']
		},
		{
			'name': 'Black',
			'hex': '#000000',
			'rgb': 'rgb(0, 0, 0)',
			'families': ['black']
		},
		{
			'name': 'BlanchedAlmond',
			'hex': '#FFEBCD',
			'rgb': 'rgb(255, 235, 205)',
			'families': ['brown', 'white']
		},
		{
			'name': 'Blue',
			'hex': '#0000FF',
			'rgb': 'rgb(0, 0, 255)',
			'families': ['blue']
		},
		{
			'name': 'BlueViolet',
			'hex': '#8A2BE2',
			'rgb': 'rgb(138, 43, 226)',
			'families': ['blue', 'purple']
		},
		{
			'name': 'Brown',
			'hex': '#A52A2A',
			'rgb': 'rgb(165, 42, 42)',
			'families': ['brown', 'red']
		},
		{
			'name': 'BurlyWood',
			'hex': '#DEB887',
			'rgb': 'rgb(222, 184, 135)',
			'families': ['brown']
		},
		{
			'name': 'CadetBlue',
			'hex': '#5F9EA0',
			'rgb': 'rgb(95, 158, 160)',
			'families': ['blue', 'gray']
		},
		{
			'name': 'Chartreuse',
			'hex': '#7FFF00',
			'rgb': 'rgb(127, 255, 0)',
			'families': ['green']
		},
		{
			'name': 'Chocolate',
			'hex': '#D2691E',
			'rgb': 'rgb(210, 105, 30)',
			'families': ['brown']
		},
		{
			'name': 'Coral',
			'hex': '#FF7F50',
			'rgb': 'rgb(255, 127, 80)',
			'families': ['orange', 'red']
		},
		{
			'name': 'CornflowerBlue',
			'hex': '#6495ED',
			'rgb': 'rgb(100, 149, 237)',
			'families': ['blue']
		},
		{
			'name': 'Cornsilk',
			'hex': '#FFF8DC',
			'rgb': 'rgb(255, 248, 220)',
			'families': ['white', 'yellow']
		},
		{
			'name': 'Crimson',
			'hex': '#DC143C',
			'rgb': 'rgb(220, 20, 60)',
			'families': ['red']
		},
		{
			'name': 'Cyan',
			'hex': '#00FFFF',
			'rgb': 'rgb(0, 255, 255)',
			'families': ['blue', 'cyan']
		},
		{
			'name': 'DarkBlue',
			'hex': '#00008B',
			'rgb': 'rgb(0, 0, 139)',
			'families': ['blue']
		},
		{
			'name': 'DarkCyan',
			'hex': '#008B8B',
			'rgb': 'rgb(0, 139, 139)',
			'families': ['blue', 'cyan']
		},
		{
			'name': 'DarkGoldenrod',
			'hex': '#B8860B',
			'rgb': 'rgb(184, 134, 11)',
			'families': ['brown', 'yellow']
		},
		{
			'name': 'DarkGray',
			'hex': '#A9A9A9',
			'rgb': 'rgb(169, 169, 169)',
			'families': ['gray']
		},
		{
			'name': 'DarkGreen',
			'hex': '#006400',
			'rgb': 'rgb(0, 100, 0)',
			'families': ['green']
		},
		{
			'name': 'DarkKhaki',
			'hex': '#BDB76B',
			'rgb': 'rgb(189, 183, 107)',
			'families': ['yellow', 'brown']
		},
		{
			'name': 'DarkMagenta',
			'hex': '#8B008B',
			'rgb': 'rgb(139, 0, 139)',
			'families': ['purple']
		},
		{
			'name': 'DarkOliveGreen',
			'hex': '#556B2F',
			'rgb': 'rgb(85, 107, 47)',
			'families': ['green']
		},
		{
			'name': 'DarkOrange',
			'hex': '#FF8C00',
			'rgb': 'rgb(255, 140, 0)',
			'families': ['orange']
		},
		{
			'name': 'DarkOrchid',
			'hex': '#9932CC',
			'rgb': 'rgb(153, 50, 204)',
			'families': ['purple']
		},
		{
			'name': 'DarkRed',
			'hex': '#8B0000',
			'rgb': 'rgb(139, 0, 0)',
			'families': ['red']
		},
		{
			'name': 'DarkSalmon',
			'hex': '#E9967A',
			'rgb': 'rgb(233, 150, 122)',
			'families': ['red', 'orange']
		},
		{
			'name': 'DarkSeaGreen',
			'hex': '#8FBC8F',
			'rgb': 'rgb(143, 188, 143)',
			'families': ['green']
		},
		{
			'name': 'DarkSlateBlue',
			'hex': '#483D8B',
			'rgb': 'rgb(72, 61, 139)',
			'families': ['blue', 'purple']
		},
		{
			'name': 'DarkSlateGray',
			'hex': '#2F4F4F',
			'rgb': 'rgb(47, 79, 79)',
			'families': ['gray']
		},
		{
			'name': 'DarkTurquoise',
			'hex': '#00CED1',
			'rgb': 'rgb(0, 206, 209)',
			'families': ['blue', 'cyan']
		},
		{
			'name': 'DarkViolet',
			'hex': '#9400D3',
			'rgb': 'rgb(148, 0, 211)',
			'families': ['purple']
		},
		{
			'name': 'DeepPink',
			'hex': '#FF1493',
			'rgb': 'rgb(255, 20, 147)',
			'families': ['pink', 'red']
		},
		{
			'name': 'DeepSkyBlue',
			'hex': '#00BFFF',
			'rgb': 'rgb(0, 191, 255)',
			'families': ['blue']
		},
		{
			'name': 'DimGray',
			'hex': '#696969',
			'rgb': 'rgb(105, 105, 105)',
			'families': ['gray']
		},
		{
			'name': 'DodgerBlue',
			'hex': '#1E90FF',
			'rgb': 'rgb(30, 144, 255)',
			'families': ['blue']
		},
		{
			'name': 'Firebrick',
			'hex': '#B22222',
			'rgb': 'rgb(178, 34, 34)',
			'families': ['red']
		},
		{
			'name': 'FloralWhite',
			'hex': '#FFFAF0',
			'rgb': 'rgb(255, 250, 240)',
			'families': ['white']
		},
		{
			'name': 'ForestGreen',
			'hex': '#228B22',
			'rgb': 'rgb(34, 139, 34)',
			'families': ['green']
		},
		{
			'name': 'Fuchsia',
			'hex': '#FF00FF',
			'rgb': 'rgb(255, 0, 255)',
			'families': ['pink', 'purple']
		},
		{
			'name': 'Gainsboro',
			'hex': '#DCDCDC',
			'rgb': 'rgb(220, 220, 220)',
			'families': ['gray']
		},
		{
			'name': 'GhostWhite',
			'hex': '#F8F8FF',
			'rgb': 'rgb(248, 248, 255)',
			'families': ['white']
		},
		{
			'name': 'Gold',
			'hex': '#FFD700',
			'rgb': 'rgb(255, 215, 0)',
			'families': ['yellow']
		},
		{
			'name': 'Goldenrod',
			'hex': '#DAA520',
			'rgb': 'rgb(218, 165, 32)',
			'families': ['brown', 'yellow']
		},
		{
			'name': 'Gray',
			'hex': '#808080',
			'rgb': 'rgb(128, 128, 128)',
			'families': ['gray']
		},
		{
			'name': 'Green',
			'hex': '#008000',
			'rgb': 'rgb(0, 128, 0)',
			'families': ['green']
		},
		{
			'name': 'GreenYellow',
			'hex': '#ADFF2F',
			'rgb': 'rgb(173, 255, 47)',
			'families': ['green', 'yellow']
		},
		{
			'name': 'Honeydew',
			'hex': '#F0FFF0',
			'rgb': 'rgb(240, 255, 240)',
			'families': ['white', 'green']
		},
		{
			'name': 'HotPink',
			'hex': '#FF69B4',
			'rgb': 'rgb(255, 105, 180)',
			'families': ['pink']
		},
		{
			'name': 'IndianRed',
			'hex': '#CD5C5C',
			'rgb': 'rgb(205, 92, 92)',
			'families': ['red']
		},
		{
			'name': 'Indigo',
			'hex': '#4B0082',
			'rgb': 'rgb(75, 0, 130)',
			'families': ['purple']
		},
		{
			'name': 'Ivory',
			'hex': '#FFFFF0',
			'rgb': 'rgb(255, 255, 240)',
			'families': ['white']
		},
		{
			'name': 'Khaki',
			'hex': '#F0E68C',
			'rgb': 'rgb(240, 230, 140)',
			'families': ['yellow']
		},
		{
			'name': 'Lavender',
			'hex': '#E6E6FA',
			'rgb': 'rgb(230, 230, 250)',
			'families': ['purple']
		},
		{
			'name': 'LavenderBlush',
			'hex': '#FFF0F5',
			'rgb': 'rgb(255, 240, 245)',
			'families': ['white', 'pink']
		},
		{
			'name': 'LawnGreen',
			'hex': '#7CFC00',
			'rgb': 'rgb(124, 252, 0)',
			'families': ['green']
		},
		{
			'name': 'LemonChiffon',
			'hex': '#FFFACD',
			'rgb': 'rgb(255, 250, 205)',
			'families': ['white', 'yellow']
		},
		{
			'name': 'LightBlue',
			'hex': '#ADD8E6',
			'rgb': 'rgb(173, 216, 230)',
			'families': ['blue']
		},
		{
			'name': 'LightCoral',
			'hex': '#F08080',
			'rgb': 'rgb(240, 128, 128)',
			'families': ['red']
		},
		{
			'name': 'LightCyan',
			'hex': '#E0FFFF',
			'rgb': 'rgb(224, 255, 255)',
			'families': ['blue', 'cyan', 'white']
		},
		{
			'name': 'LightGoldenrodYellow',
			'hex': '#FAFAD2',
			'rgb': 'rgb(250, 250, 210)',
			'families': ['yellow', 'white']
		},
		{
			'name': 'LightGray',
			'hex': '#D3D3D3',
			'rgb': 'rgb(211, 211, 211)',
			'families': ['gray']
		},
		{
			'name': 'LightGreen',
			'hex': '#90EE90',
			'rgb': 'rgb(144, 238, 144)',
			'families': ['green']
		},
		{
			'name': 'LightPink',
			'hex': '#FFB6C1',
			'rgb': 'rgb(255, 182, 193)',
			'families': ['pink']
		},
		{
			'name': 'LightSalmon',
			'hex': '#FFA07A',
			'rgb': 'rgb(255, 160, 122)',
			'families': ['red', 'orange']
		},
		{
			'name': 'LightSeaGreen',
			'hex': '#20B2AA',
			'rgb': 'rgb(32, 178, 170)',
			'families': ['green', 'blue']
		},
		{
			'name': 'LightSkyBlue',
			'hex': '#87CEFA',
			'rgb': 'rgb(135, 206, 250)',
			'families': ['blue']
		},
		{
			'name': 'LightSlateGray',
			'hex': '#778899',
			'rgb': 'rgb(119, 136, 153)',
			'families': ['gray']
		},
		{
			'name': 'LightSteelBlue',
			'hex': '#B0C4DE',
			'rgb': 'rgb(176, 196, 222)',
			'families': ['blue', 'gray']
		},
		{
			'name': 'LightYellow',
			'hex': '#FFFFE0',
			'rgb': 'rgb(255, 255, 224)',
			'families': ['yellow', 'white']
		},
		{
			'name': 'Lime',
			'hex': '#00FF00',
			'rgb': 'rgb(0, 255, 0)',
			'families': ['green']
		},
		{
			'name': 'LimeGreen',
			'hex': '#32CD32',
			'rgb': 'rgb(50, 205, 50)',
			'families': ['green']
		},
		{
			'name': 'Linen',
			'hex': '#FAF0E6',
			'rgb': 'rgb(250, 240, 230)',
			'families': ['white']
		},
		{
			'name': 'Magenta',
			'hex': '#FF00FF',
			'rgb': 'rgb(255, 0, 255)',
			'families': ['pink', 'purple']
		},
		{
			'name': 'Maroon',
			'hex': '#800000',
			'rgb': 'rgb(128, 0, 0)',
			'families': ['red', 'brown']
		},
		{
			'name': 'MediumAquamarine',
			'hex': '#66CDAA',
			'rgb': 'rgb(102, 205, 170)',
			'families': ['green', 'blue']
		},
		{
			'name': 'MediumBlue',
			'hex': '#0000CD',
			'rgb': 'rgb(0, 0, 205)',
			'families': ['blue']
		},
		{
			'name': 'MediumOrchid',
			'hex': '#BA55D3',
			'rgb': 'rgb(186, 85, 211)',
			'families': ['purple', 'pink']
		},
		{
			'name': 'MediumPurple',
			'hex': '#9370DB',
			'rgb': 'rgb(147, 112, 219)',
			'families': ['purple']
		},
		{
			'name': 'MediumSeaGreen',
			'hex': '#3CB371',
			'rgb': 'rgb(60, 179, 113)',
			'families': ['green']
		},
		{
			'name': 'MediumSlateBlue',
			'hex': '#7B68EE',
			'rgb': 'rgb(123, 104, 238)',
			'families': ['blue', 'purple']
		},
		{
			'name': 'MediumSpringGreen',
			'hex': '#00FA9A',
			'rgb': 'rgb(0, 250, 154)',
			'families': ['green']
		},
		{
			'name': 'MediumTurquoise',
			'hex': '#48D1CC',
			'rgb': 'rgb(72, 209, 204)',
			'families': ['blue', 'green']
		},
		{
			'name': 'MediumVioletRed',
			'hex': '#C71585',
			'rgb': 'rgb(199, 21, 133)',
			'families': ['pink', 'red']
		},
		{
			'name': 'MidnightBlue',
			'hex': '#191970',
			'rgb': 'rgb(25, 25, 112)',
			'families': ['blue']
		},
		{
			'name': 'MintCream',
			'hex': '#F5FFFA',
			'rgb': 'rgb(245, 255, 250)',
			'families': ['white']
		},
		{
			'name': 'MistyRose',
			'hex': '#FFE4E1',
			'rgb': 'rgb(255, 228, 225)',
			'families': ['white', 'pink']
		},
		{
			'name': 'Moccasin',
			'hex': '#FFE4B5',
			'rgb': 'rgb(255, 228, 181)',
			'families': ['yellow', 'brown']
		},
		{
			'name': 'NavajoWhite',
			'hex': '#FFDEAD',
			'rgb': 'rgb(255, 222, 173)',
			'families': ['white', 'brown']
		},
		{
			'name': 'Navy',
			'hex': '#000080',
			'rgb': 'rgb(0, 0, 128)',
			'families': ['blue']
		},
		{
			'name': 'OldLace',
			'hex': '#FDF5E6',
			'rgb': 'rgb(253, 245, 230)',
			'families': ['white']
		},
		{
			'name': 'Olive',
			'hex': '#808000',
			'rgb': 'rgb(128, 128, 0)',
			'families': ['green', 'brown']
		},
		{
			'name': 'OliveDrab',
			'hex': '#6B8E23',
			'rgb': 'rgb(107, 142, 35)',
			'families': ['green']
		},
		{
			'name': 'Orange',
			'hex': '#FFA500',
			'rgb': 'rgb(255, 165, 0)',
			'families': ['orange']
		},
		{
			'name': 'OrangeRed',
			'hex': '#FF4500',
			'rgb': 'rgb(255, 69, 0)',
			'families': ['orange', 'red']
		},
		{
			'name': 'Orchid',
			'hex': '#DA70D6',
			'rgb': 'rgb(218, 112, 214)',
			'families': ['purple', 'pink']
		},
		{
			'name': 'PaleGoldenrod',
			'hex': '#EEE8AA',
			'rgb': 'rgb(238, 232, 170)',
			'families': ['yellow']
		},
		{
			'name': 'PaleGreen',
			'hex': '#98FB98',
			'rgb': 'rgb(152, 251, 152)',
			'families': ['green']
		},
		{
			'name': 'PaleTurquoise',
			'hex': '#AFEEEE',
			'rgb': 'rgb(175, 238, 238)',
			'families': ['blue', 'cyan']
		},
		{
			'name': 'PaleVioletRed',
			'hex': '#DB7093',
			'rgb': 'rgb(219, 112, 147)',
			'families': ['pink', 'red']
		},
		{
			'name': 'PapayaWhip',
			'hex': '#FFEFD5',
			'rgb': 'rgb(255, 239, 213)',
			'families': ['white']
		},
		{
			'name': 'PeachPuff',
			'hex': '#FFDAB9',
			'rgb': 'rgb(255, 218, 185)',
			'families': ['orange', 'white']
		},
		{
			'name': 'Peru',
			'hex': '#CD853F',
			'rgb': 'rgb(205, 133, 63)',
			'families': ['brown']
		},
		{
			'name': 'Pink',
			'hex': '#FFC0CB',
			'rgb': 'rgb(255, 192, 203)',
			'families': ['pink']
		},
		{
			'name': 'Plum',
			'hex': '#DDA0DD',
			'rgb': 'rgb(221, 160, 221)',
			'families': ['purple']
		},
		{
			'name': 'PowderBlue',
			'hex': '#B0E0E6',
			'rgb': 'rgb(176, 224, 230)',
			'families': ['blue']
		},
		{
			'name': 'Purple',
			'hex': '#800080',
			'rgb': 'rgb(128, 0, 128)',
			'families': ['purple']
		},
		{
			'name': 'RebeccaPurple',
			'hex': '#663399',
			'rgb': 'rgb(102, 51, 153)',
			'families': ['purple']
		},
		{
			'name': 'Red',
			'hex': '#FF0000',
			'rgb': 'rgb(255, 0, 0)',
			'families': ['red']
		},
		{
			'name': 'RosyBrown',
			'hex': '#BC8F8F',
			'rgb': 'rgb(188, 143, 143)',
			'families': ['brown']
		},
		{
			'name': 'RoyalBlue',
			'hex': '#4169E1',
			'rgb': 'rgb(65, 105, 225)',
			'families': ['blue']
		},
		{
			'name': 'SaddleBrown',
			'hex': '#8B4513',
			'rgb': 'rgb(139, 69, 19)',
			'families': ['brown']
		},
		{
			'name': 'Salmon',
			'hex': '#FA8072',
			'rgb': 'rgb(250, 128, 114)',
			'families': ['red', 'pink']
		},
		{
			'name': 'SandyBrown',
			'hex': '#F4A460',
			'rgb': 'rgb(244, 164, 96)',
			'families': ['brown']
		},
		{
			'name': 'SeaGreen',
			'hex': '#2E8B57',
			'rgb': 'rgb(46, 139, 87)',
			'families': ['green']
		},
		{
			'name': 'SeaShell',
			'hex': '#FFF5EE',
			'rgb': 'rgb(255, 245, 238)',
			'families': ['white']
		},
		{
			'name': 'Sienna',
			'hex': '#A0522D',
			'rgb': 'rgb(160, 82, 45)',
			'families': ['brown']
		},
		{
			'name': 'Silver',
			'hex': '#C0C0C0',
			'rgb': 'rgb(192, 192, 192)',
			'families': ['gray']
		},
		{
			'name': 'SkyBlue',
			'hex': '#87CEEB',
			'rgb': 'rgb(135, 206, 235)',
			'families': ['blue']
		},
		{
			'name': 'SlateBlue',
			'hex': '#6A5ACD',
			'rgb': 'rgb(106, 90, 205)',
			'families': ['blue', 'purple']
		},
		{
			'name': 'SlateGray',
			'hex': '#708090',
			'rgb': 'rgb(112, 128, 144)',
			'families': ['gray']
		},
		{
			'name': 'Snow',
			'hex': '#FFFAFA',
			'rgb': 'rgb(255, 250, 250)',
			'families': ['white']
		},
		{
			'name': 'SpringGreen',
			'hex': '#00FF7F',
			'rgb': 'rgb(0, 255, 127)',
			'families': ['green']
		},
		{
			'name': 'SteelBlue',
			'hex': '#4682B4',
			'rgb': 'rgb(70, 130, 180)',
			'families': ['blue']
		},
		{
			'name': 'Tan',
			'hex': '#D2B48C',
			'rgb': 'rgb(210, 180, 140)',
			'families': ['brown']
		},
		{
			'name': 'Teal',
			'hex': '#008080',
			'rgb': 'rgb(0, 128, 128)',
			'families': ['blue', 'green']
		},
		{
			'name': 'Thistle',
			'hex': '#D8BFD8',
			'rgb': 'rgb(216, 191, 216)',
			'families': ['purple']
		},
		{
			'name': 'Tomato',
			'hex': '#FF6347',
			'rgb': 'rgb(255, 99, 71)',
			'families': ['red', 'orange']
		},
		{
			'name': 'Turquoise',
			'hex': '#40E0D0',
			'rgb': 'rgb(64, 224, 208)',
			'families': ['blue', 'green']
		},
		{
			'name': 'Violet',
			'hex': '#EE82EE',
			'rgb': 'rgb(238, 130, 238)',
			'families': ['purple']
		},
		{
			'name': 'Wheat',
			'hex': '#F5DEB3',
			'rgb': 'rgb(245, 222, 179)',
			'families': ['brown']
		},
		{
			'name': 'White',
			'hex': '#FFFFFF',
			'rgb': 'rgb(255, 255, 255)',
			'families': ['white']
		},
		{
			'name': 'WhiteSmoke',
			'hex': '#F5F5F5',
			'rgb': 'rgb(245, 245, 245)',
			'families': ['white']
		},
		{
			'name': 'Yellow',
			'hex': '#FFFF00',
			'rgb': 'rgb(255, 255, 0)',
			'families': ['yellow']
		},
		{
			'name': 'YellowGreen',
			'hex': '#9ACD32',
			'rgb': 'rgb(154, 205, 50)',
			'families': ['yellow', 'green']
		}
	];


	let inputValue = $state('');
	let suggestions = $state([]);
	let showSuggestions = $state(false);
	let selectedIndex = $state(-1);
	let isOpen = $state(false);
	let inputContainer;
	let inputRef;


	// Function to log color info
	function logColorInfo(color) {
		const rgb = color;
		if (rgb) {
			// console.log({
			// 	name: color,
			// 	rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			// 	values: rgb
			// });
			selectedShapes.forEach(item => {
				if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_COLOR_1) {
					item.color1 = color;
				} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_COLOR_2) {
					item.color2 = rgb;
				}
			});
			keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
			closeModal();
		}
	}

	$effect(() => {
		if (inputValue) {
			suggestions = colors
				.filter(color => (color.name.replace('-', '').toLowerCase().includes(inputValue.replace('-', '').toLowerCase()) || color.families.includes(inputValue.toLowerCase())))
				.slice(0, 15);
		} else {
			suggestions = [];
		}
		selectedIndex = -1;
	});

	function openModal() {
		isOpen = true;
		setTimeout(() => inputRef?.focus(), 50);
	}

	function closeModal() {
		isOpen = false;
		inputValue = '';
		showSuggestions = false;
	}

	// Function to find closest matching color
	function findClosestColor(input) {
		if (!input) return null;

		// First try exact match
		const exactMatch = colors.find(color =>
			color.name.replace('-', '').toLowerCase() === input.replace('-', '').toLowerCase()
		);
		if (exactMatch) return exactMatch;

		// Then try starts with
		const startsWith = colors.find(color =>
			color.name.replace('-', '').toLowerCase().startsWith(input.replace('-', '').toLowerCase())
		);
		if (startsWith) return startsWith;

		// Finally try includes
		const includes = colors.find(color =>
			color.name.replace('-', '').toLowerCase().includes(input.replace('-', '').toLowerCase())
		);
		return includes || null;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && !showSuggestions) {
			closeModal();
			return;
		}

		if (!showSuggestions) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = (selectedIndex + 1) % suggestions.length;
				// Scroll selected item into view
				// suggestionRefs[selectedIndex]?.scrollIntoView({
				// 	behavior: 'smooth',
				// 	block: 'nearest'
				// });

				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
				break;
			case 'Enter':
				if (selectedIndex >= 0) {
					const selectedColor = suggestions[selectedIndex].rgb;
					inputValue = selectedColor;
					logColorInfo(selectedColor);
					showSuggestions = false;
				} else {
					const closestMatch = findClosestColor(inputValue);
					if (closestMatch) {
						inputValue = closestMatch.name;
						logColorInfo(closestMatch.rgb);
						showSuggestions = false;
					}
				}
				break;
			case 'Escape':
				showSuggestions = false;
				break;
		}
	}

	function handleInput(event) {
		inputValue = event.target.value;
		showSuggestions = true;
	}

	function selectColor(color) {
		inputValue = color.name;
		logColorInfo(color.rgb);
		showSuggestions = false;
	}

	function handleClickOutside(event) {
		if (inputContainer && !inputContainer.contains(event.target)) {
			showSuggestions = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<!-- Trigger button -->
<button id="colorPicker"
				onclick={openModal}
				class="hidden px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
	Choose a Color
</button>

<!-- Modal overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
		<div
			class="relative w-full max-w-xl p-8"
			bind:this={inputContainer}
		>
			<!-- Close button -->
			<button
				onclick={closeModal}
				class="absolute right-10 top-0 text-white hover:text-gray-300"
			>
				✕
			</button>

			<input
				bind:this={inputRef}
				type="text"
				value={inputValue}
				oninput={handleInput}
				onkeydown={handleKeydown}
				placeholder="Type a color name..."
				class="text-black w-full px-6 py-4 text-lg bg-white border-2 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>

			{#if showSuggestions && suggestions.length > 0}
				<ul class="absolute w-full mt-2 bg-white border rounded-xl shadow-xl max-h-80 overflow-y-auto grid grid-cols-2">
					{#each suggestions as suggestion, i}
						<li
							class="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-100 {i === selectedIndex ? 'bg-gray-100' : ''}"
							onclick={() => selectColor(suggestion)}
						>
							<div
								class="w-6 h-6 rounded-md border shadow-sm"
								style="background-color: {suggestion.rgb}"
							></div>
							<span class="text-gray-800 text-lg">{suggestion.name}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/if}