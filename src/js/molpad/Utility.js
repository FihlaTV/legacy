/**
 * This file is part of MolView (http://molview.org)
 * Copyright (c) 2014, Herman Bergwerf
 *
 * MolView is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MolView is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with MolView.  If not, see <http://www.gnu.org/licenses/>.
 */

function lineLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    return {
        x: ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / div,
        y: ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / div
    };
}

/**
 * Calculate angle between two angles where from is the first encountered angle
 * in counter clockwise direction
 * @param {Float} from
 * @param {Float} to
 */
function angleBetween(from, to)
{
	if(to <= from)//to is actually larger than 2PI and therefore smaller than from
	{
		return to - from + 2 * Math.PI;
	}
	else
	{
		return to - from;
	}
}

//TODO: always clamp horizontal or vertical angle
function clampedAngle(start, center, point, steps)
{
	var a = center.angleTo(point);
	var clampFactor = steps / (2 * Math.PI);
	return Math.round((a - start) * clampFactor) / clampFactor
			+ start;//clamp to x steps, normalize to startAngle
}

/**
 * Maps an array using a given map, removes all elements which are not
 * in the map
 * @param  {Array}  array
 * @param  {Object} map
 * @return {Array}
 */
function mapArray(array, map)
{
    for(var i = 0; i < array.length; i++)
	{
		if(map[array[i]] !== undefined)
		{
			array[i] = map[array[i]];
		}
		else
		{
			array.splice(i, 1);
			i--;
		}
	}

    return array;
}

/**
 * Multiply all values in an array with a given multiplier into new array
 * @param  {Array} array
 * @param  {Float} mult
 * @return {Array}
 */
function multiplyAll(array, mult)
{
	var ret = []
	for(var i = 0; i < array.length; i++)
		ret.push(array[i] * mult);
	return ret;
}

function getMultiTouchDelta(e)
{
	var t = e.originalEvent.targetTouches;
	if(t.length <= 1) return 0;
	else
	{
		var dx = Math.abs(t[0].pageX - t[1].pageX);
		var dy = Math.abs(t[0].pageY - t[1].pageY);
		return Math.sqrt(dx * dx + dy * dy);
	}
}
